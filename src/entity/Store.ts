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
import { SaleManager } from './SaleManager';
import { User } from './User';

@Entity()
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  industry: IndustryType;

  @Column({ nullable: true })
  logoPath?: string;

  @OneToMany((_type) => SaleManager, (saleManager) => saleManager.store, {
    eager: false,
  })
  saleManagers: SaleManager[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
