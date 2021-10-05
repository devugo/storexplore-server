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
import { Store } from './Store';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column({ default: true })
  active?: boolean;

  @Column({ nullable: true })
  imagePath?: string;

  @Column()
  quantity: number;

  @Column()
  costPrice: number;

  @Column({ nullable: true })
  sellingPrice?: number;

  @OneToMany((_type) => Sale, (sale) => sale.product, {
    eager: false,
  })
  sales: Sale[];

  @ManyToOne((_type) => Store, (store) => store.products, {
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
