import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { IndustryType } from '../enum/IndustryType';
import { Product } from './Product';
import { Sale } from './Sale';
import { SaleManager } from './SaleManager';
import { User } from './User';

@Entity()
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  defaultPassword?: string;

  @Column({ nullable: true })
  industry?: IndustryType;

  @Column({ nullable: true })
  logoPath?: string;

  @OneToMany((_type) => SaleManager, (saleManager) => saleManager.store, {
    eager: false,
  })
  saleManagers: SaleManager[];

  @OneToMany((_type) => Product, (product) => product.store, {
    eager: false,
  })
  products: Product[];

  @OneToMany((_type) => Sale, (sale) => sale.store, {
    eager: false,
  })
  sales: Sale[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.store, {
    eager: true,
  })
  @JoinColumn()
  user: User;
}
