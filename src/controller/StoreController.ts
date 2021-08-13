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

export class StoreController {
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

  async single(request: Request, response: Response, next: NextFunction) {
    const requestUser = request.user;

    try {
      const user = await this.userRepository.findOne({
        email: requestUser.email,
      });
      return await this.storeService.single(response, user);
    } catch (_error) {
      return unathorizedError(response);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { name, industry }: CreateStoreDto = request.body;
    const requestUser = request.user;
    const id = request.params.id;

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await this.userRepository.findOne({
        email: requestUser.email,
      });

      if (id) {
        return await this.storeService.update(
          response,
          id,
          { name, industry },
          user,
        );
      }
    } catch (_error) {
      return unathorizedError(response);
    }
  }

  async uploadLogo(request: Request, response: Response, next: NextFunction) {
    const requestUser = request.user;
    const id = request.params.id;

    try {
      const user = await this.userRepository.findOne({
        email: requestUser.email,
      });

      if (id) {
        // parse a file upload
        const form = new Formidable();

        const file: string = await new Promise(function (resolve, reject) {
          form.parse(request, async (err, fields, files) => {
            resolve(files.image.path);
          });
        });

        const logoPath = await uploadHelper(file);
        if (typeof logoPath === 'string') {
          const updateStore = await this.storeService.updateLogo(
            response,
            id,
            logoPath,
            user,
          );
          return updateStore;
        }
        return logoPath;
      }
    } catch (_error) {
      return unathorizedError(response);
    }
  }
}
