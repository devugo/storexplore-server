import { getManager, getRepository } from 'typeorm';
import { Store } from '../entity/Store';
import { Product } from '../entity/Product';
import { Sale } from '../entity/Sale';
import { SaleManager } from '../entity/SaleManager';
import { SaleBatch } from '../entity/SaleBatch';
import { GetSalesFilterDto } from '../dto/get-sales.dto';
import { User } from '../entity/User';
import { PAGINATION } from '../constant/PAGINATION';

const moment = require('moment');

export class SaleService {
  private saleRepository = getRepository(Sale);
  private productRepository = getRepository(Product);
  private saleBatchRepository = getRepository(SaleBatch);
  private userRepository = getRepository(User);
  private saleManagerRepository = getRepository(SaleManager);
  private entityManager = getManager();

  async get(
    store: Store,
    saleManager: SaleManager,
    filterDto: GetSalesFilterDto,
  ): Promise<{ count: number; sales: Sale[] }> {
    const {
      page,
      date,
      product,
      startDate,
      endDate,
      saleManager: saleM,
    } = filterDto;
    try {
      let sales;
      const query = this.saleRepository.createQueryBuilder('sale');
      query.andWhere('sale.storeId = :store', {
        store: store.id,
      });
      if (product) {
        query.andWhere('sale.productId = :product', {
          product: product,
        });
      }
      if (date) {
        query.andWhere('sale.date = :date', {
          date: `${date} 01:00:00`,
        });
      }
      //  Store owner sale manager query param
      if (saleM) {
        query.andWhere('sale.saleManagerId = :sm', {
          sm: saleM,
        });
      }
      if (startDate && endDate) {
        const startDateIsoString = new Date(startDate).toISOString();
        const endDateIsoString = new Date(endDate + ' 23:59:59').toISOString();
        query.andWhere('sale.createdAt BETWEEN :startDate AND :endDate', {
          startDate: startDateIsoString,
          endDate: endDateIsoString,
        });
      }
      if (saleManager) {
        query.andWhere('sale.saleManagerId = :sm', {
          sm: saleManager.id,
        });
      }
      query.leftJoinAndSelect('sale.product', 'product');
      query.leftJoinAndSelect('sale.saleManager', 'sale_manager');

      if (page) {
        query.skip(PAGINATION.itemsPerPage * (parseInt(page) - 1));
        sales = await query.take(PAGINATION.itemsPerPage).getMany();
      } else {
        sales = await query.getMany();
      }
      const count = await query.getCount();

      return { count, sales };
    } catch (error) {
      throw error;
    }
  }

  async mySales(saleManager: SaleManager): Promise<Sale[]> {
    try {
      const sales = await this.saleRepository.find({
        saleManager,
      });

      return sales;
    } catch (error) {
      throw error;
    }
  }

  async getOne(id: string, store: Store): Promise<Sale> {
    try {
      const sale = await this.saleRepository.findOne({
        where: { id, store },
      });

      return sale;
    } catch (error) {
      throw error;
    }
  }

  async mySale(id: string, saleManager: SaleManager): Promise<Sale> {
    try {
      const sale = await this.saleRepository.findOne({
        where: { id, saleManager },
      });

      return sale;
    } catch (error) {
      throw error;
    }
  }

  async create(createSaleDto: {
    from: string;
    sale: any;
  }): Promise<Sale | any> {
    try {
      const {
        from,
        sale: { product, soldAt, quantity },
      } = createSaleDto;
      const user = await this.userRepository.findOne({ where: { id: from } });
      const getProduct = await this.productRepository.findOne(product);
      const saleManager = await this.saleManagerRepository.findOne({
        where: { user },
      });

      if (getProduct) {
        if (getProduct.quantity >= quantity) {
          let batch;
          // Check if batch has been created
          const batchExist = await this.saleBatchRepository.findOne({
            date: new Date(),
            saleManager,
          });

          if (batchExist) {
            batch = batchExist;
          } else {
            // Create new batch
            const newBatch = await this.saleBatchRepository.create({
              date: new Date(),
              saleManager,
              store: saleManager.store,
            });

            batch = newBatch;
          }

          const sale = this.saleRepository.create({
            soldAt,
            product: getProduct,
            quantity,
            store: saleManager.store,
            saleManager,
            saleBatch: batch,
            date: moment().format('YYYY-MM-DD'),
          });

          await this.saleRepository.save(sale);

          // Update Product quantity
          if (getProduct) {
            getProduct.quantity = getProduct.quantity - quantity;

            this.productRepository.save(getProduct);
          }
          return sale;
        } else {
          return { error: `There are only ${getProduct.quantity} items left` };
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string, sm: string): Promise<any> {
    try {
      const saleManager = await this.saleManagerRepository.findOne(sm);
      const sale = await this.saleRepository.findOne({
        where: { saleManager, id },
      });
      // Add quantity back to product
      const product = sale.product;
      product.quantity = product.quantity + sale.quantity;
      await this.productRepository.save(product);

      if (sale) {
        const deleteSale = await this.saleRepository.remove(sale);
        return deleteSale;
      } else {
        return { error: 'Unable to delete sale' };
      }

      // throw new Error('Invalid request');
    } catch (error) {
      throw error;
    }
  }

  todaySales(store: Store): any {
    console.log({ store });
    const startDateIsoString = new Date().toISOString();
    const endDateIsoString = new Date().toISOString();
    // const query = this.saleRepository.createQueryBuilder('sale');
    // query.andWhere('sale.storeId = :store', {
    //   store: store.id,
    // });
    // const today = await query.getMany();
    console.log({ startDateIsoString, endDateIsoString });
    const today = this.entityManager.query(
      'SELECT COUNT(id) FROM sale WHERE sale.storeId = $1',
      ['b3ca4358-72fb-4866-b6bc-63a21e559200'],
    );

    // console.log({ today });
    return today;
  }
}
