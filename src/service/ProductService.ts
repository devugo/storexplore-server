import { getRepository } from 'typeorm';
import { Store } from '../entity/Store';
import { uploadHelper } from './uploadHelper';
import { Product } from '../entity/Product';
import { CreateProductDto } from '../dto/create-product-dto';

// const notFoundErrMsg = (id: string): string =>
//   notFoundErrorMessage('Store Manger', id);

export class ProductService {
  private productRepository = getRepository(Product);

  async get(store: Store): Promise<Product[]> {
    try {
      const products = await this.productRepository.find({
        store,
      });

      return products;
    } catch (error) {
      throw error;
    }
  }

  async getOne(id: string, store: Store): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({
        where: { id, store },
      });

      return product;
    } catch (error) {
      throw error;
    }
  }

  async create(
    createProductDto: CreateProductDto,
    store: Store,
  ): Promise<Product> {
    try {
      const { name, description, image, costPrice, sellingPrice, quantity } =
        createProductDto;

      const imagePath = await uploadHelper(image);

      const product = this.productRepository.create({
        name,
        description,
        imagePath,
        costPrice,
        sellingPrice,
        quantity,
        store,
      });

      await this.productRepository.save(product);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    createProductDto: CreateProductDto,
    store: Store,
  ): Promise<Product> {
    try {
      const { name, description, costPrice, sellingPrice } = createProductDto;

      //  Get Product
      const product = await this.productRepository.findOne({
        where: { id, store },
      });

      if (product) {
        product.name = name;
        product.description = description;
        product.costPrice = costPrice;
        product.sellingPrice = sellingPrice;
      }

      return this.productRepository.save(product);
    } catch (error) {
      throw error;
    }
  }

  async activate(id: string, active: boolean, store: Store): Promise<Product> {
    try {
      //  Get Product
      const product = await this.productRepository.findOne({
        where: { store, id },
      });

      if (product) {
        product.active = active;
      }

      return this.productRepository.save(product);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string, store: Store): Promise<any> {
    try {
      const product = await this.productRepository.findOne({
        where: { store, id },
      });
      const deleteProduct = await this.productRepository.remove(product);
      return deleteProduct;
    } catch (error) {
      throw error;
    }
  }

  async uploadImage(id: string, file: string, store: Store): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({
        where: { id, store },
      });
      const imagePath = await uploadHelper(file);

      if (product) {
        product.imagePath = imagePath;

        await this.productRepository.save(product);
      }
      return product;
    } catch (error) {
      throw error;
    }
  }
}
