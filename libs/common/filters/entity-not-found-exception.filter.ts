import { Catch } from '@nestjs/common';
import { EntityNotFoundException } from '../exeptions';
import { BaseExceptionFilter } from './base-exception.filter';

@Catch(EntityNotFoundException)
export class EntityNotFoundExceptionFilter extends BaseExceptionFilter<EntityNotFoundException> {}
