import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { RoleType } from '../enum/RoleType';
import { Chat } from './Chat';
import { SaleManager } from './SaleManager';
import { Store } from './Store';
import { StoreOwner } from './StoreOwner';

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

  @OneToOne(() => StoreOwner, (storeOwner) => storeOwner.user, {
    onDelete: 'CASCADE',
  })
  storeOwner: StoreOwner;

  @OneToMany((_type) => Chat, (chat) => chat.from, {
    eager: false,
  })
  chatsFrom: Chat[];

  @OneToMany((_type) => Chat, (chat) => chat.to, {
    eager: false,
  })
  chatsTo: Chat[];

  @OneToOne(() => Store, (store) => store.user)
  store: Store;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
