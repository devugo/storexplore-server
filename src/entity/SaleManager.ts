import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
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

  @OneToOne(() => User, (user) => user.saleManager, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @ManyToOne((_type) => Store, (store) => store.saleManagers, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  store: Store;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
