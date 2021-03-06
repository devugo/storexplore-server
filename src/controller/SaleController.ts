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

  async dashboardSummary(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { email } = request.user;
    const format = request.query.format;

    try {
      const user = await this.userRepository.findOne({ email });
      let store;
      let saleManager;
      store = await this.storeRepository.findOne({ user });

      if (!store) {
        saleManager = await this.saleManagerRepository.findOne({ user });
        store = saleManager.store;
      }

      //  Get sale
      const sales = await this.saleService.dashboardSummary(
        store,
        format,
        saleManager,
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
}
