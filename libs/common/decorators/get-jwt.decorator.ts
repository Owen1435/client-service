import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetJwtDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const jwt = request.cookies.jwt;
    const token_body = jwt.split('.')[1];
    return JSON.parse(atob(token_body));
  },
);
