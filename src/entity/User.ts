import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { RoleType } from '../enum/RoleType';
import { SaleManager } from './SaleManager';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  role: RoleType;

  @OneToOne(() => SaleManager, (saleManager) => saleManager.user, {
    onDelete: 'CASCADE',
  })
  saleManager: SaleManager;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
