import { BadRequestException, HttpStatus } from '@nestjs/common';

export class WrongDatesException extends BadRequestException {
  constructor() {
    super(HttpStatus.BAD_REQUEST, 'Wrong dates');
  }
}
