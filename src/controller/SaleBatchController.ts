import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { throwError } from '../helper/throw-error';
import { User } from '../entity/User';

import { Store } from '../entity/Store';
import { SaleBatchService } from '../service/SaleBatchService';

export class SaleBatchController {
  private saleBatchService = new SaleBatchService();
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

      //  Get sale batches
      const saleBatches = await this.saleBatchService.get(store);

      return saleBatches;
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

      //  Get Sale batch
      const saleBatch = await this.saleBatchService.getOne(id, store);

      return saleBatch;
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

      //  Create Sale Batch
      const saleBatch = await this.saleBatchService.create(request.body, store);

      return saleBatch;
    } catch (error) {
      const err = throwError(error);
      return response.status(err.code).json({
        message: err.message,
        success: false,
      });
    }
  }

  async activate(request: Request, response: Response, next: NextFunction) {
    const requestUser = request.user;
    const id = request.params.id;

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const storeUser = await this.userRepository.findOne({
        email: requestUser.email,
      });
      const store = await this.storeRepository.findOne({ user: storeUser });
      if (id) {
        return await this.saleBatchService.activate(
          id,
          request.body.active,
          store,
        );
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
