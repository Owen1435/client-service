import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../jwt/jwt.constant';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const getToken = jwt.verify(request.cookies.jwt, SECRET_KEY);
      return !!getToken;
    } catch (e) {
      throw new HttpException('User unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
