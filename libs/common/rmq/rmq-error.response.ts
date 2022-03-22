import { RmqResponse } from './rmq.response';
import { HttpStatus } from '@nestjs/common';

export const rmqErrorResponse = (error: any) => {
  return new RmqResponse<any>(
    null,
    error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
    { ...error, message: error.message }, //todo: на клиенте у ошибки нет поля message, а тут есть
  );
};
