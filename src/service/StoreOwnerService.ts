import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { CreateStoreOwnerDto } from '../dto/create-store-owner-dto';
import { StoreOwner } from '../entity/StoreOwner';

export class StoreOwnerService {
  private storeOwnerRepository = getRepository(StoreOwner);

  async create(
    createStoreOwnerDto: CreateStoreOwnerDto,
    user: User,
  ): Promise<StoreOwner> {
    try {
      const { name } = createStoreOwnerDto;

      const storeOwner = this.storeOwnerRepository.create({
        name,
        user,
      });

      await this.storeOwnerRepository.save(storeOwner);
      return storeOwner;
    } catch (error) {
      throw error;
    }
  }
}
