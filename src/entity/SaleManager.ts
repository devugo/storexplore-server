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
import { Sale } from './Sale';
import { SaleBatch } from './SaleBatch';
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

  @OneToMany((_type) => SaleBatch, (saleBatch) => saleBatch.saleManager, {
    eager: false,
  })
  saleBatches: SaleBatch[];

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
