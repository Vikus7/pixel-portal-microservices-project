import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Message } from './message.entity';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'nvarchar', length: 255, unique: true })
  Username: string;

  @OneToMany(() => Message, message => message.user)
  messages: Message[];
}