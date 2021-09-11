import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { throwError } from '../helper/throw-error';
import { User } from '../entity/User';

import * as Formidable from 'formidable';
import { validationErrorMessage } from '../helper/validation-error-message';
import { StoreOwnerService } from '../service/StoreOwnerService';

export class StoreOwnerController {
  private storeOwnerService = new StoreOwnerService();
  private userRepository = getRepository(User);

  async update(request: Request, response: Response, next: NextFunction) {
    const requestUser = request.user;

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
      return await this.storeOwnerService.update(request.body, user);
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

      const uodateStoreowner = await this.storeOwnerService.uploadAvatar(
        file,
        user,
      );

      return uodateStoreowner;
    } catch (error) {
      const err = throwError(error);
      return response.status(err.code).json({
        message: err.message,
        success: false,
      });
    }
  }
}
