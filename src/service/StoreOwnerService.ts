import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { CreateStoreOwnerDto } from '../dto/create-store-owner-dto';
import { StoreOwner } from '../entity/StoreOwner';
import { uploadHelper } from '../helper/uploadHelper';

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

  async update(
    updateStoreOwnerDto: CreateStoreOwnerDto,
    user: User,
  ): Promise<StoreOwner> {
    try {
      const { name, about } = updateStoreOwnerDto;

      //  Get Store Owner
      const storeOwner = await this.storeOwnerRepository.findOne({
        user,
      });

      if (storeOwner) {
        storeOwner.name = name;
        storeOwner.about = about;
      }

      return this.storeOwnerRepository.save(storeOwner);
    } catch (error) {
      throw error;
    }
  }

  async uploadAvatar(file: string, user: User): Promise<StoreOwner> {
    try {
      const storeOwner = await this.storeOwnerRepository.findOne({
        where: { user },
      });
      const imagePath = await uploadHelper(file);

      if (storeOwner) {
        storeOwner.photo = imagePath;

        await this.storeOwnerRepository.save(storeOwner);
      }
      return storeOwner;
    } catch (error) {
      throw error;
    }
  }
}
