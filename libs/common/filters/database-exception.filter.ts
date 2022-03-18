import { Catch } from '@nestjs/common';
import { BaseExceptionFilter } from './base-exception.filter';
import { DatabaseException } from '../exeptions';

@Catch(DatabaseException)
export class DatabaseExceptionFilter extends BaseExceptionFilter<DatabaseException> {}
