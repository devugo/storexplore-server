import { getRepository } from 'typeorm';
import { Store } from '../entity/Store';
import { uploadHelper } from '../helper/uploadHelper';
import { Product } from '../entity/Product';
import { CreateProductDto } from '../dto/create-product-dto';
import { GetProductsFilterDto } from '../dto/get-products-filter.dto';
import { PAGINATION } from '../constant/PAGINATION';

export class ProductService {
  private productRepository = getRepository(Product);

  async get(
    store: Store,
    filterDto: GetProductsFilterDto,
  ): Promise<{ count: number; products: Product[] }> {
    const { page } = filterDto;
    try {
      const query = this.productRepository.createQueryBuilder('product');
      query.andWhere('product.storeId = :store', {
        store: store.id,
      });

      if (page) {
        query.skip(PAGINATION.itemsPerPage * (parseInt(page) - 1));
      }
      const count = await query.getCount();
      const products = await query.take(PAGINATION.itemsPerPage).getMany();

      return { count, products };
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
      const { name, description, costPrice, sellingPrice, quantity } =
        createProductDto;

      //  Get Product
      const product = await this.productRepository.findOne({
        where: { id, store },
      });

      if (product) {
        product.name = name;
        product.description = description;
        product.costPrice = costPrice;
        product.sellingPrice = sellingPrice;
        product.quantity = quantity;
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
