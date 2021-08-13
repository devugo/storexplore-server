import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StoreService } from '../service/StoreService';
import { throwError } from '../helper/throw-error';
import { User } from '../entity/User';

import * as Formidable from 'formidable';
import { uploadHelper } from '../service/uploadHelper';
import { Store } from '../entity/Store';
import { SaleManagerService } from '../service/SaleManagerService';
import { CreateSaleManagerDto } from '../dto/create-sale-manager';
import { UserService } from '../service/UserService';

export class SaleManagerController {
  private storeService = new StoreService();
  private saleManagerService = new SaleManagerService();
  private userService = new UserService();
  private userRepository = getRepository(User);
  private storeRepository = getRepository(Store);

  async get(request: Request, response: Response, next: NextFunction) {
    const { email } = request.user;

    try {
      const storeUser = await this.userRepository.findOne({ email });
      const store = await this.storeRepository.findOne({ user: storeUser });

      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }

      //  Create Sale Managers
      const saleManagers = await this.saleManagerService.get(store);

      return saleManagers;
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
      const storeUser = await this.userRepository.findOne({ email });
      const store = await this.storeRepository.findOne({ user: storeUser });

      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }

      //  Get Sale Manager
      const saleManager = await this.saleManagerService.getOne(id, store);

      return saleManager;
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
      const storeUser = await this.userRepository.findOne({ email });
      const store = await this.storeRepository.findOne({ user: storeUser });

      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }

      //  Create Sale Manager
      const saleManager = await this.saleManagerService.create(
        request.body,
        store,
      );

      return saleManager;
    } catch (error) {
      const err = throwError(error);
      return response.status(err.code).json({
        message: err.message,
        success: false,
      });
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const requestUser = request.user;

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await this.userRepository.findOne({
        email: requestUser.email,
      });
      return await this.saleManagerService.update(request.body, user);
    } catch (error) {
      const err = throwError(error);
      return response.status(err.code).json({
        message: err.message,
        success: false,
      });
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    const requestUser = request.user;
    const id = request.params.id;

    try {
      const storeUser = await this.userRepository.findOne({
        email: requestUser.email,
      });
      const store = await this.storeRepository.findOne({ user: storeUser });

      if (id) {
        const deleteManager = await this.saleManagerService.delete(store);

        return deleteManager;
      }
    } catch (error) {
      const err = throwError(error);
      return response.status(err.code).json({
        message: err.message,
        success: false,
      });
    }
  }

  async uploadAvatar(request: Request, response: Response, next: NextFunction) {
    const requestUser = request.user;

    try {
      const user = await this.userRepository.findOne({
        email: requestUser.email,
      });

      // parse a file upload
      const form = new Formidable();

      const file: string = await new Promise(function (resolve, reject) {
        form.parse(request, async (err, fields, files) => {
          resolve(files.image.path);
        });
      });

      const updateSaleManager = await this.saleManagerService.uploadAvatar(
        file,
        user,
      );

      return updateSaleManager;
    } catch (error) {
      const err = throwError(error);
      return response.status(err.code).json({
        message: err.message,
        success: false,
      });
    }
  }
}
