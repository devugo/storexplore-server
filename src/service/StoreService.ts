import { getRepository } from 'typeorm';
import { Store } from '../entity/Store';
import { CreateStoreDto } from '../dto/create-store.dto';
import { Response } from 'express';
import { notFoundError, serverError } from '../helper/throw-error';
import { User } from '../entity/User';
import { notFoundErrorMessage } from '../helper/get-error-message';
import { ERROR_CODE } from '../constant/ERROR_CODE';
import { RoleType } from '../enum/RoleType';

const notFoundErrMsg = (id: string): string =>
  notFoundErrorMessage('Store', id);

export class StoreService {
  private storeRepository = getRepository(Store);

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    const { name, industry, address, defaultPassword, user } = createStoreDto;

    const store = this.storeRepository.create({
      name,
      industry,
      address,
      defaultPassword,
      user,
    });

    try {
      await this.storeRepository.save(store);
      return store;
    } catch (err) {
      throw err;
    }
  }

  async single(response: Response, user: User): Promise<Store> {
    try {
      let store;
      if (user.role === RoleType.ADMIN) {
        store = await this.storeRepository.findOne({
          where: { user },
        });
      }

      if (!store) {
        return notFoundError(response, 'Store doesnt exist');
      }
      return store;
    } catch (error) {
      if (error.code === ERROR_CODE.internal) {
        return serverError(response);
      }
      return notFoundError(response, 'Store doesnt exist');
    }
  }

  async update(
    response: Response,
    id: string,
    createStoreDto: CreateStoreDto,
    user: User,
  ): Promise<Store> {
    try {
      const { name, industry, address, defaultPassword } = createStoreDto;
      const store = await this.storeRepository.findOne({
        where: { id, user },
      });

      if (store) {
        store.name = name;
        store.industry = industry;
        store.address = address;
        store.defaultPassword = defaultPassword;

        await this.storeRepository.save(store);
        return store;
      } else {
        return notFoundError(response, notFoundErrMsg(id));
      }
    } catch (error) {
      if (error.code === ERROR_CODE.internal) {
        return serverError(response, error.message);
      }
      return notFoundError(response, notFoundErrMsg(id));
    }
  }

  async updateLogo(
    response: Response,
    id: string,
    logoPath: string,
    user: User,
  ): Promise<Store> {
    try {
      const store = await this.storeRepository.findOne({
        where: { id, user },
      });

      if (store) {
        store.logoPath = logoPath;

        await this.storeRepository.save(store);
        return store;
      } else {
        return notFoundError(response, notFoundErrMsg(id));
      }
    } catch (error) {
      if (error.code === ERROR_CODE.internal) {
        return serverError(response, error.message);
      }
      return notFoundError(response, notFoundErrMsg(id));
    }
  }
}
