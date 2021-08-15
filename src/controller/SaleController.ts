import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { throwError } from '../helper/throw-error';
import { User } from '../entity/User';

import { Store } from '../entity/Store';
import { SaleService } from '../service/SaleService';
import { SaleManager } from '../entity/SaleManager';

export class SaleController {
  private saleService = new SaleService();
  private userRepository = getRepository(User);
  private storeRepository = getRepository(Store);
  private saleManagerRepository = getRepository(SaleManager);

  async get(request: Request, response: Response, next: NextFunction) {
    const { email } = request.user;

    try {
      const storeUser = await this.userRepository.findOne({ email });
      const store = await this.storeRepository.findOne({ user: storeUser });

      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }

      //  Get sales
      const sales = await this.saleService.get(store);

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

  async create(request: Request, response: Response, next: NextFunction) {
    const { email } = request.user;

    try {
      const user = await this.userRepository.findOne({ email });
      const saleManager = await this.saleManagerRepository.findOne({ user });

      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }

      //  Create Sale
      const sale = await this.saleService.create(request.body, saleManager);

      return sale;
    } catch (error) {
      const err = throwError(error);
      return response.status(err.code).json({
        message: err.message,
        success: false,
      });
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { email } = request.user;
    const id = request.params.id;

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      if (id) {
        const user = await this.userRepository.findOne({ email });
        const saleManager = await this.saleManagerRepository.findOne({ user });
        return await this.saleService.update(id, request.body, saleManager);
      }
    } catch (error) {
      const err = throwError(error);
      return response.status(err.code).json({
        message: err.message,
        success: false,
      });
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    const { email } = request.user;
    const id = request.params.id;

    try {
      const user = await this.userRepository.findOne({ email });
      const saleManager = await this.saleManagerRepository.findOne({ user });

      if (id) {
        const deleteSale = await this.saleService.delete(id, saleManager);

        return deleteSale;
      }
    } catch (error) {
      const err = throwError(error);
      return response.status(err.code).json({
        message: err.message,
        success: false,
      });
    }
  }
}
