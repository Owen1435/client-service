import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('token')
export class TokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  token: string;

  @Column()
  createdAt: Date;

  @Column()
  expiredAt: Date;
}
