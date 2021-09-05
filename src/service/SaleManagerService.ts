import { getRepository } from 'typeorm';
// import { notFoundErrorMessage } from '../helper/get-error-message';
import { SaleManager } from '../entity/SaleManager';
import { CreateSaleManagerDto } from '../dto/create-sale-manager';
import { Store } from '../entity/Store';
import { UserService } from './UserService';
import { User } from '../entity/User';
import { uploadHelper } from '../helper/uploadHelper';
import { RoleType } from '../enum/RoleType';
import { GetSaleManagersFilterDto } from '../dto/get-sale-managers-filter.dto';
import { PAGINATION } from '../constant/PAGINATION';

// const notFoundErrMsg = (id: string): string =>
//   notFoundErrorMessage('Store Manger', id);

export class SaleManagerService {
  private saleManagerRepository = getRepository(SaleManager);
  private userRepository = getRepository(User);
  private userService = new UserService();

  async get(
    store: Store,
    filterDto: GetSaleManagersFilterDto,
  ): Promise<{ count: number; saleManagers: SaleManager[] }> {
    const { page } = filterDto;
    try {
      const query =
        this.saleManagerRepository.createQueryBuilder('sale_manager');
      query.andWhere('sale_manager.storeId = :store', {
        store: store.id,
      });
      let saleManagers;
      if (page) {
        query.skip(PAGINATION.itemsPerPage * (parseInt(page) - 1));
        saleManagers = await query.take(PAGINATION.itemsPerPage).getMany();
      } else {
        saleManagers = await query.getMany();
      }

      const count = await query.getCount();

      return { count, saleManagers };
    } catch (error) {
      throw error;
    }
  }

  async getOne(id: string, store: Store): Promise<SaleManager> {
    try {
      const saleManager = await this.saleManagerRepository.findOne({
        where: { id, store },
      });

      return saleManager;
    } catch (error) {
      throw error;
    }
  }

  async create(
    createSaleManagerDto: CreateSaleManagerDto,
    store: Store,
  ): Promise<SaleManager> {
    try {
      const {
        firstname,
        lastname,
        othernames,
        gender,
        address,
        dob,
        email,
        password,
      } = createSaleManagerDto;

      //  Register User
      const user = await this.userService.register({
        email,
        password,
        role: RoleType.SALE_MANAGER,
      });

      const saleManager = this.saleManagerRepository.create({
        firstname,
        lastname,
        othernames,
        dob,
        gender,
        address,
        user,
        store,
      });

      await this.saleManagerRepository.save(saleManager);
      return saleManager;
    } catch (error) {
      throw error;
    }
  }

  async update(
    createSaleManagerDto: CreateSaleManagerDto,
    user: User,
  ): Promise<SaleManager> {
    try {
      const { firstname, lastname, othernames, dob } = createSaleManagerDto;

      //  Get Sale Manager
      const saleManager = await this.saleManagerRepository.findOne({
        user,
      });

      if (saleManager) {
        saleManager.firstname = firstname;
        saleManager.lastname = lastname;
        saleManager.othernames = othernames;
        saleManager.dob = dob;
      }

      return this.saleManagerRepository.save(saleManager);
    } catch (error) {
      throw error;
    }
  }

  async activate(
    id: string,
    active: boolean,
    store: Store,
  ): Promise<SaleManager> {
    try {
      //  Get Sale Manager
      const saleManager = await this.saleManagerRepository.findOne({
        where: { store, id },
      });

      if (saleManager) {
        saleManager.active = active;
      }

      return this.saleManagerRepository.save(saleManager);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string, store: Store): Promise<any> {
    try {
      const saleManager = await this.saleManagerRepository.findOne({
        where: { store, id },
      });
      const deleteSaleManager = await this.userRepository.remove(
        saleManager.user,
      );
      return deleteSaleManager;
    } catch (error) {
      throw error;
    }
  }

  async uploadAvatar(file: string, user: User): Promise<SaleManager> {
    try {
      const saleManager = await this.saleManagerRepository.findOne({
        where: { user },
      });
      const logoPath = await uploadHelper(file);

      if (saleManager) {
        saleManager.photo = logoPath;

        await this.saleManagerRepository.save(saleManager);
      }
      return saleManager;
    } catch (error) {
      throw error;
    }
  }
}
