import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { throwError } from '../helper/throw-error';
import { User } from '../entity/User';

import * as Formidable from 'formidable';
import { Store } from '../entity/Store';
import { ProductService } from '../service/ProductService';
import { validationErrorMessage } from '../helper/validation-error-message';

export class ProductController {
  private productService = new ProductService();
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

      //  Get products
      const products = await this.productService.get(store, request.query);

      return products;
    } catch (error) {
      console.log(error.message);
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

      //  Get Product
      const product = await this.productService.getOne(id, store);

      return product;
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

      // parse a file upload
      const form = new Formidable();

      let data;
      const file: string = await new Promise(function (resolve, reject) {
        form.parse(request, async (err, fields, files) => {
          data = fields;
          resolve(files.image.path);
        });
      });
      data.image = file;

      //  Create Product
      const product = await this.productService.create(data, store);

      return response.status(201).json(product);
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
      return response
        .status(400)
        .json({ message: validationErrorMessage(errors.array()) });
    }

    try {
      if (id) {
        const storeUser = await this.userRepository.findOne({ email });
        const store = await this.storeRepository.findOne({ user: storeUser });
        return await this.productService.update(id, request.body, store);
      }
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
        return await this.productService.activate(
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

  async delete(request: Request, response: Response, next: NextFunction) {
    const requestUser = request.user;
    const id = request.params.id;

    try {
      const storeUser = await this.userRepository.findOne({
        email: requestUser.email,
      });
      const store = await this.storeRepository.findOne({ user: storeUser });

      if (id) {
        const deleteProduct = await this.productService.delete(id, store);

        return deleteProduct;
      }
    } catch (error) {
      const err = throwError(error);
      return response.status(err.code).json({
        message: err.message,
        success: false,
      });
    }
  }

  async uploadImage(request: Request, response: Response, next: NextFunction) {
    const requestUser = request.user;
    const id = request.params.id;

    try {
      const storeUser = await this.userRepository.findOne({
        email: requestUser.email,
      });
      const store = await this.storeRepository.findOne({ user: storeUser });

      if (id) {
        // parse a file upload
        const form = new Formidable();

        const file: string = await new Promise(function (resolve, reject) {
          form.parse(request, async (err, fields, files) => {
            resolve(files.image.path);
          });
        });

        const updateSaleManager = await this.productService.uploadImage(
          id,
          file,
          store,
        );

        return updateSaleManager;
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
