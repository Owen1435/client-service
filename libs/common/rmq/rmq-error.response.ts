import { RmqResponse } from './rmq.response';
import { HttpStatus } from '@nestjs/common';

export const rmqErrorResponse = (error: any) => {
  return new RmqResponse<any>(
    null,
    error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
    { ...error, message: error.message }, //todo: иногда на клиенте у ошибки почему-то нет поля message
  );
};
