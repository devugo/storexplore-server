import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';
import { UserService } from '../service/UserService';
import { CreateUserDto } from '../dto/create-user-dto';
import { validationResult } from 'express-validator';
import { throwError } from '../helper/throw-error';
import { ERROR_CODE } from '../constant/ERROR_CODE';

export class UserController {
  private userRepository = getRepository(User);
  private userService = new UserService();

  async register(request: Request, response: Response, next: NextFunction) {
    const { email, password }: CreateUserDto = request.body;

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const create = await this.userService.register({ email, password });
      return create;
    } catch (error) {
      const err = throwError(error);
      return response.status(err.code).json({
        message: err.message,
        success: false,
      });
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    const { email, password }: CreateUserDto = request.body;

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
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
