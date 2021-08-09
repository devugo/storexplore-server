import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StoreService } from '../service/StoreService';
import { CreateStoreDto } from '../dto/create-store.dto';
import { throwError, unathorizedError } from '../helper/throw-error';
import { User } from '../entity/User';
import { successCreationMessage } from '../helper/get-error-message';

import * as Formidable from 'formidable';
import { uploadHelper } from '../service/uploadHelper';

export class SaleManagerController {
  private storeService = new StoreService();
  private userRepository = getRepository(User);

  async create(request: Request, response: Response, next: NextFunction) {
    const { name, industry }: CreateStoreDto = request.body;

    const { email } = request.user;
    const user = await this.userRepository.findOne({ email });

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const create = await this.storeService.create({
        name,
        industry,
        user,
      });
      return response.status(201).json({
        success: true,
        message: successCreationMessage('Store'),
        response: create,
      });
    } catch (error) {
      const err = throwError(error);
      return response.status(err.code).json({
        message: err.message,
        success: false,
      });
    }
  }
}
