import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Store } from './Store';
import { User } from './User';

@Entity()
export class SaleManager {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  othernames: string;

  @Column()
  dob: Date;

  @Column({ nullable: true })
  photo?: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Store)
  @JoinColumn()
  store: Store;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
