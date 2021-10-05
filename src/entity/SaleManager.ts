import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { GenderType } from '../enum/GenderType';
import { Sale } from './Sale';
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

  @Column({ nullable: true })
  othernames?: string;

  @Column({ nullable: true })
  address?: string;

  @Column()
  gender: GenderType;

  @Column()
  dob: Date;

  @Column({ nullable: true })
  photo?: string;

  @Column({ default: true })
  active: boolean;

  @OneToOne(() => User, (user) => user.saleManager, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @OneToMany((_type) => Sale, (sale) => sale.saleManager, {
    eager: false,
  })
  sales: Sale[];

  @ManyToOne((_type) => Store, (store) => store.saleManagers, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  store: Store;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
