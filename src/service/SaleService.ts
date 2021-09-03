import { getRepository } from 'typeorm';
import { Store } from '../entity/Store';
import { Product } from '../entity/Product';
import { Sale } from '../entity/Sale';
import { CreateSaleDto } from '../dto/create-sale-dto';
import { SaleManager } from '../entity/SaleManager';
import { SaleBatch } from '../entity/SaleBatch';
import { GetSalesFilterDto } from '../dto/get-sales.dto';
import { User } from '../entity/User';

// const notFoundErrMsg = (id: string): string =>
//   notFoundErrorMessage('Store Manger', id);

export class SaleService {
  private saleRepository = getRepository(Sale);
  private productRepository = getRepository(Product);
  private saleBatchRepository = getRepository(SaleBatch);
  private userRepository = getRepository(User);
  private saleManagerRepository = getRepository(SaleManager);

  async get(
    store: Store,
    saleManager: SaleManager,
    filterDto: GetSalesFilterDto,
  ): Promise<Sale[]> {
    const { date } = filterDto;
    try {
      let sales;
      if (date) {
        if (saleManager) {
          sales = await this.saleRepository.find({
            where: {
              store,
              saleManager,
              date: date,
            },
          });
        } else {
          sales = await this.saleRepository.find({
            where: {
              store,
              date: date,
            },
          });
        }
      } else {
        if (saleManager) {
          sales = await this.saleRepository.find({
            store,
            saleManager,
          });
        } else {
          sales = await this.saleRepository.find({
            store,
          });
        }
      }

      return sales;
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
        sale: { productId, soldAt, quantity },
      } = createSaleDto;
      const user = await this.userRepository.findOne({ where: { id: from } });
      const getProduct = await this.productRepository.findOne(productId);
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
            date: new Date(),
          });

          await this.saleRepository.save(sale);

          // Update Product quantity
          if (getProduct) {
            getProduct.quantity = `${parseInt(getProduct.quantity) - quantity}`;

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

  async update(
    id: string,
    createSaleDto: CreateSaleDto,
    saleManager: SaleManager,
  ): Promise<Sale> {
    try {
      const { soldAt, quantity } = createSaleDto;

      //  Get sale
      const sale = await this.saleRepository.findOne({
        where: { id, saleManager },
      });

      if (sale) {
        //  Only delete when batch is activ
        if (sale.saleBatch.active) {
          sale.soldAt = soldAt;
          sale.quantity = quantity;

          return this.saleRepository.save(sale);
        }
      }
      throw new Error('Invalid request');
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string, saleManager: SaleManager): Promise<any> {
    try {
      const sale = await this.saleRepository.findOne({
        where: { saleManager, id },
      });
      if (sale) {
        //  Only delete when batch is activ
        if (sale.saleBatch.active) {
          const deleteSale = await this.saleRepository.remove(sale);
          return deleteSale;
        }
      }
      throw new Error('Invalid request');
    } catch (error) {
      throw error;
    }
  }
}
