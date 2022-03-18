import { Client, QueryResult } from 'pg';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DbClientService {
  private readonly client: Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      user: this.configService.get<string>('database.user'),
      database: this.configService.get<string>('database.name'),
      password: this.configService.get<string>('database.password'),
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
    });

    this.client.connect().then(undefined);
  }

  /** получение первой строки */
  async row<T = unknown>(query: string): Promise<T | null> {
    const queryResult = await this.client.query(query);
    if (queryResult?.rows) {
      return queryResult.rows[0] ?? null;
    } else {
      throw new Error('Bad query. Empty result.');
    }
  }

  /** получение значения строк */
  async rows<T = unknown>(query: string): Promise<Array<T>> {
    const queryResult = await this.client.query(query);
    if (queryResult?.rows) {
      return queryResult.rows ?? [];
    } else {
      throw new Error('Bad query. Empty result.');
    }
  }

  async sql(query: string): Promise<QueryResult> {
    return this.client.query(query);
  }
}
