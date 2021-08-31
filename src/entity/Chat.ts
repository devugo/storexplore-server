import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  message: string;

  @ManyToOne((_type) => User, (user) => user.chatsFrom, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  from: User;

  @ManyToOne((_type) => User, (user) => user.chatsTo, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  to: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
