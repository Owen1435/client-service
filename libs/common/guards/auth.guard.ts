import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenRepository } from '../../../src/modules/auth/token.repository';
import { MoreThanOrEqual } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private tokenRepository: TokenRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    try {
      const jwt = request.cookies.jwt;
      const { id } = await this.jwtService.verify(jwt);

      const userToken = await this.tokenRepository.findOne({
        userId: id,
        expiredAt: MoreThanOrEqual(new Date()),
      });

      return !!userToken;
    } catch (e) {
      throw new HttpException('User unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
