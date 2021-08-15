import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Sale } from './Sale';
import { SaleManager } from './SaleManager';
import { Store } from './Store';

@Entity()
export class SaleBatch {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  date: Date;

  @Column({ default: true })
  active: boolean;

  @ManyToOne((_type) => Store, (store) => store.saleBatches, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  store: Store;

  @ManyToOne((_type) => SaleManager, (saleManager) => saleManager.saleBatches, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  saleManager: SaleManager;

  @OneToMany((_type) => Sale, (sale) => sale.saleBatch, {
    eager: false,
  })
  sales: Sale[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
