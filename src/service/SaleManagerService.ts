import { getRepository } from 'typeorm';
import { Response } from 'express';
import { notFoundError, serverError } from '../helper/throw-error';
import { notFoundErrorMessage } from '../helper/get-error-message';
import { ERROR_CODE } from '../constant/ERROR_CODE';
import { SaleManager } from '../entity/SaleManager';
import { CreateSaleManagerDto } from '../dto/create-sale-manager';

const notFoundErrMsg = (id: string): string =>
  notFoundErrorMessage('Store Manger', id);

export class SaleManagerService {
  private saleManagerRepository = getRepository(SaleManager);

  async create(
    createSaleManagerDto: CreateSaleManagerDto,
  ): Promise<SaleManager> {
    const { firstname, lastname, othernames, dob, user, store } =
      createSaleManagerDto;

    const saleManager = this.saleManagerRepository.create({
      firstname,
      lastname,
      othernames,
      dob,
      user,
      store,
    });

    try {
      await this.saleManagerRepository.save(saleManager);
      return saleManager;
    } catch (err) {
      throw err;
    }
  }
}
