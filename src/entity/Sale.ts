import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Product } from './Product';
import { SaleBatch } from './SaleBatch';
import { SaleManager } from './SaleManager';
import { Store } from './Store';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: true, default: 0 })
  soldAt?: number;

  @Column({ nullable: true, default: 0 })
  quantity?: number;

  @Column()
  date: Date;

  @ManyToOne((_type) => Product, (product) => product.sales, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: Product;

  @ManyToOne((_type) => SaleBatch, (saleBatch) => saleBatch.sales, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  saleBatch: SaleBatch;

  @ManyToOne((_type) => Store, (store) => store.sales, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  store: Store;

  @ManyToOne((_type) => SaleManager, (saleManager) => saleManager.sales, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  saleManager: SaleManager;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
