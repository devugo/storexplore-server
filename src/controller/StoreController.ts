import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StoreService } from '../service/StoreService';
import { CreateStoreDto } from '../dto/create-store.dto';
import { unathorizedError } from '../helper/throw-error';
import { User } from '../entity/User';

import * as Formidable from 'formidable';
import { uploadHelper } from '../helper/uploadHelper';
import { validationErrorMessage } from '../helper/validation-error-message';

export class StoreController {
  private storeService = new StoreService();
  private userRepository = getRepository(User);

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
    const { name, industry, address, defaultPassword }: CreateStoreDto =
      request.body;
    const requestUser = request.user;
    const id = request.params.id;

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response
        .status(400)
        .json({ message: validationErrorMessage(errors.array()) });
    }

    try {
      const user = await this.userRepository.findOne({
        email: requestUser.email,
      });

      if (id) {
        return await this.storeService.update(
          response,
          id,
          { name, industry, address, defaultPassword },
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
            if (files && files.image && files.image.path) {
              resolve(files.image.path);
            } else {
              reject(err);
            }
          });
        });
        if (file) {
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
      } else {
        return response
          .status(400)
          .json({ message: 'Please, specify a store' });
      }
    } catch (error) {
      if (!error) {
        return response.status(400).json({ message: 'Please, uplaod a file' });
      } else {
        return unathorizedError(response);
      }
    }
  }
}
