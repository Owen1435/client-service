import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientLoginRequestDto } from './dto/client-login.request.dto';
import { ClientEntity } from '../../entity/client.entity';
import { ClientRegistrationRequestDto } from './dto/client-registration.request.dto';
import { RmqResponse } from '../../../libs/common/rmq/rmq.response';
import { ClientLoginResponseDto } from './dto/client-login.response.dto';
import { rmqErrorResponse } from '../../../libs/common/rmq/rmq-error.response';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { plainToClass } from 'class-transformer';
import { RoleRepository } from '../role/role.repository';
import { RoleEntity } from 'src/entity/role.entity';
import * as bcrypt from 'bcrypt';
import { ClientService } from '../client/client.service';

@Injectable()
export class AuthService {
  constructor(
    private clientService: ClientService,
    private roleRepository: RoleRepository,
    private jwtService: JwtService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async login(
    loginData: ClientLoginRequestDto,
  ): Promise<RmqResponse<ClientLoginResponseDto>> {
    try {
      const client = await this.clientService.getByLogin(loginData.login);
      const payload = {
        id: client.id,
        login: client.login,
        roles: client.roles?.map((role) => role.role),
      };

      return new RmqResponse<ClientLoginResponseDto>(
        {
          token: this.jwtService.sign(payload),
        },
        HttpStatus.OK,
      );
    } catch (error) {
      return rmqErrorResponse(error);
    }
  }

  async registration(
    registerData: ClientRegistrationRequestDto,
  ): Promise<RmqResponse<string>> {
    try {
      const client = await this.clientService.getByLogin(registerData.login);
      if (client) {
        throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
      }

      const role: RoleEntity = await this.roleRepository.findOne({
        role: 'admin', //test
      });

      const newClient = plainToClass(ClientEntity, {
        registerDate: new Date(),
        login: registerData.login,
        mail: registerData.mail,
        pass: await bcrypt.hash(registerData.pass, 12),
        roles: [role],
      });

      const savedClient = await this.clientService.register(newClient);

      this.amqpConnection.publish('client.registered.exchange', '', {
        client: savedClient,
      });

      return new RmqResponse<string>(
        'Registration successes',
        HttpStatus.CREATED,
      );
    } catch (error) {
      return rmqErrorResponse(error);
    }
  }

  async validateUser(login: string, pass: string) {
    const user = await this.clientService.getByLogin(login);
    if (!user) {
      throw new HttpException('User was not found', HttpStatus.NOT_FOUND);
    }
    const passFl = await bcrypt.compare(pass, user.pass);
    if (user && passFl) {
      const { pass, ...result } = user;
      return result;
    }
    throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
  }
}
