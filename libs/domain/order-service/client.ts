import { ApiProperty } from '@nestjs/swagger';

export class Client {
  @ApiProperty({
    description: 'Client id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Client login',
    example: 'login',
  })
  login: string;
}
