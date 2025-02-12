import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('Messages')
export class Message {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'nvarchar', length: 'MAX' })
  Content: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'GETDATE()' })
  Timestamp: Date;

  @Column({ name: 'UserId' })
  UserId: number;

  @ManyToOne(() => User, user => user.messages)
  @JoinColumn({ name: 'UserId' })
  user: User;
}