import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Store } from './Store';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column({ nullable: true })
  image?: string;

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
