import { HttpStatus, NotFoundException } from '@nestjs/common';

export class EntityNotFoundException extends NotFoundException {
  constructor(entityName: string) {
    super(HttpStatus.NOT_FOUND, `${entityName} was not found`);
  }
}
