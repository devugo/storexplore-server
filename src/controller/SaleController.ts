import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { throwError } from '../helper/throw-error';
import { User } from '../entity/User';

import { Store } from '../entity/Store';
import { SaleService } from '../service/SaleService';
import { SaleManager } from '../entity/SaleManager';
import { RoleType } from '../enum/RoleType';

export class SaleController {
  private saleService = new SaleService();
  private userRepository = getRepository(User);
  private storeRepository = getRepository(Store);
  private saleManagerRepository = getRepository(SaleManager);

  async get(request: Request, response: Response, next: NextFunction) {
    const { email } = request.user;

    try {
      const user = await this.userRepository.findOne({ email });
      let store;
      let saleManager;
      if (user.role === RoleType.ADMIN) {
        store = await this.storeRepository.findOne({ user });
      } else {
        saleManager = await this.saleManagerRepository.findOne({
          user,
        });
        if (saleManager) {
          store = saleManager.store;
        }
      }

      //  Get sales
      const sales = await this.saleService.get(
        store,
        saleManager,
        request.query,
      );

      return sales;
    } catch (error) {
      const err = throwError(error);
      return response.status(err.code).json({
        message: err.message,
        success: false,
      });
    }
  }

  async mySales(request: Request, response: Response, next: NextFunction) {
    const { email } = request.user;

    try {
      const user = await this.userRepository.findOne({ email });
      const saleManager = await this.saleManagerRepository.findOne({ user });

      //  Get sales
      const sales = await this.saleService.mySales(saleManager);

      return sales;
    } catch (error) {
      const err = throwError(error);
      return response.status(err.code).json({
        message: err.message,
        success: false,
      });
    }
  }

  async getOne(request: Request, response: Response, next: NextFunction) {
    const { email } = request.user;
    const id = request.params.id;

    try {
      if (id) {
        const storeUser = await this.userRepository.findOne({ email });
        const store = await this.storeRepository.findOne({ user: storeUser });

        //  Get sale
        const sale = await this.saleService.getOne(id, store);

        return sale;
      }
    } catch (error) {
      const err = throwError(error);
      return response.status(err.code).json({
        message: err.message,
        success: false,
      });
    }
  }

  async mySale(request: Request, response: Response, next: NextFunction) {
    const { email } = request.user;
    const id = request.params.id;

    try {
      if (id) {
        const user = await this.userRepository.findOne({ email });
        const saleManager = await this.saleManagerRepository.findOne({ user });

        //  Get sale
        const sale = await this.saleService.mySale(id, saleManager);

        return sale;
      }
    } catch (error) {
      const err = throwError(error);
      return response.status(err.code).json({
        message: err.message,
        success: false,
      });
    }
  }

  async dashboardSummary(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    // return 'mike';
    const { email } = request.user;
    // const id = request.params.id;
    // console.log({ reqUser: request.user, id });

    try {
      const storeUser = await this.userRepository.findOne({ email });
      const store = await this.storeRepository.findOne({ user: storeUser });
      // return store;

      //  Get sale
      const sales = await this.saleService.todaySales(store);
      console.log({ sales });

      return sales;
    } catch (error) {
      console.log(error.response);
      const err = throwError(error);
      return response.status(err.code).json({
        message: err.message,
        success: false,
      });
    }
  }
}
