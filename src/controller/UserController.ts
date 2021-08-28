import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';
import { UserService } from '../service/UserService';
import { CreateUserDto } from '../dto/create-user-dto';
import { validationResult } from 'express-validator';
import { throwError } from '../helper/throw-error';
import { ERROR_CODE } from '../constant/ERROR_CODE';
import { StoreOwnerService } from '../service/StoreOwnerService';
import { validationErrorMessage } from '../helper/validation-error-message';
import { StoreService } from '../service/StoreService';

export class UserController {
  private userRepository = getRepository(User);
  private userService = new UserService();
  private storeOwnerService = new StoreOwnerService();
  private storeService = new StoreService();

  async register(request: Request, response: Response, next: NextFunction) {
    const { email, password, name, storeName }: CreateUserDto = request.body;

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response
        .status(400)
        .json({ message: validationErrorMessage(errors.array()) });
    }
    try {
      const user = await this.userService.register({ email, password });
      //  Create store owner
      await this.storeOwnerService.create({ name }, user);

      //  Create store
      await this.storeService.create({
        name: storeName,
        user,
      });
      return response.status(201).json(user);
    } catch (error) {
      console.log(error.message);
      const err = throwError(error);
      return response.status(err.code).json({
        message:
          err.code === 409 ? 'User with the email already exist' : err.message,
        success: false,
      });
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    const { email, password }: CreateUserDto = request.body;
    try {
      return await this.userService.login({ email, password });
    } catch (error) {
      const err = throwError({ code: ERROR_CODE.unathorize }, error.message);
      return response.status(err.code).json({
        message: err.message,
        success: false,
      });
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const userToRemove = await this.userRepository.findOne(request.params.id);
    await this.userRepository.remove(userToRemove);
  }
}
