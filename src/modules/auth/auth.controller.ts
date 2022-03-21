import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { ClientLoginRequestDto } from './dto/client-login.request.dto';
import { ClientRegistrationRequestDto } from './dto/client-registration.request.dto';
import { RmqResponse } from '../../../libs/common/rmq/rmq.response';
import { ClientLoginResponseDto } from './dto/client-login.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @RabbitRPC({
    exchange: 'amq.direct',
    routingKey: 'client.login.route',
    queue: 'client.login.queue',
  })
  clientLogin(
    msg: ClientLoginRequestDto,
  ): Promise<RmqResponse<ClientLoginResponseDto>> {
    return this.authService.login(msg);
  }

  @RabbitRPC({
    exchange: 'amq.direct',
    routingKey: 'client.register.route',
    queue: 'client.register.queue',
  })
  clientRegister(
    msg: ClientRegistrationRequestDto,
  ): Promise<RmqResponse<string>> {
    return this.authService.registration(msg);
  }
}
