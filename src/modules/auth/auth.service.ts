import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientRepository } from '../client/client.repository';
import { ClientLoginRequestDto } from './dto/client-login.request.dto';
import * as bcrypt from 'bcrypt';
import { ClientEntity } from '../../entity/client.entity';
import { ClientRegistrationRequestDto } from './dto/client-registration.request.dto';
import { RmqResponse } from '../../../libs/common/rmq/rmq.response';
import { ClientLoginResponseDto } from './dto/client-login.response.dto';
import { rmqErrorResponse } from '../../../libs/common/rmq/rmq-error.response';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class AuthService {
  constructor(
    private clientRepository: ClientRepository,
    private jwtService: JwtService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async login(
    loginData: ClientLoginRequestDto,
  ): Promise<RmqResponse<ClientLoginResponseDto>> {
    try {
      const client = await this.clientRepository.findOne({
        login: loginData.login,
      });
      await this.validateClient(client, loginData.pass);
      const payload = {
        login: client.login,
        id: client.id,
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
      const client = await this.clientRepository.findOne({
        login: registerData.login,
      });
      if (client) {
        throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
      }

      const newClient = new ClientEntity();
      newClient.registerDate = new Date();
      newClient.login = registerData.login;
      newClient.mail = registerData.mail;
      newClient.pass = await bcrypt.hash(registerData.pass, 12);

      const savedClient = await this.clientRepository.save(newClient);

      //todo exchange
      this.amqpConnection.publish('amq.direct', 'client.registered.route', {
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

  private async validateClient(client: ClientEntity, pass: string) {
    if (!client) {
      throw new HttpException('User was not found', HttpStatus.BAD_REQUEST);
    }
    const passFl = await bcrypt.compare(pass, client.pass);
    if (client && passFl) {
      const { pass, ...result } = client;
      return result;
    }
    throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
  }
}
