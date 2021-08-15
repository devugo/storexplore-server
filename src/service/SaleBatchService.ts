import { getRepository } from 'typeorm';
import { Store } from '../entity/Store';
import { SaleBatch } from '../entity/SaleBatch';
import { CreateSaleBatchDto } from '../dto/create-sale-batch-dto';

// const notFoundErrMsg = (id: string): string =>
//   notFoundErrorMessage('Store Manger', id);

export class SaleBatchService {
  private saleBatchRepository = getRepository(SaleBatch);

  async get(store: Store): Promise<SaleBatch[]> {
    try {
      const saleBatches = await this.saleBatchRepository.find({
        store,
      });

      return saleBatches;
    } catch (error) {
      throw error;
    }
  }

  async getOne(id: string, store: Store): Promise<SaleBatch> {
    try {
      const saleBatch = await this.saleBatchRepository.findOne({
        where: { id, store },
      });

      return saleBatch;
    } catch (error) {
      throw error;
    }
  }

  async create(
    createSaleBatchDto: CreateSaleBatchDto,
    store: Store,
  ): Promise<SaleBatch> {
    try {
      const { date } = createSaleBatchDto;

      const saleBatch = this.saleBatchRepository.create({
        date,
        store,
      });

      await this.saleBatchRepository.save(saleBatch);
      return saleBatch;
    } catch (error) {
      throw error;
    }
  }

  async activate(
    id: string,
    active: boolean,
    store: Store,
  ): Promise<SaleBatch> {
    try {
      //  Get Sale Batch
      const saleBatch = await this.saleBatchRepository.findOne({
        where: { store, id },
      });

      if (saleBatch) {
        saleBatch.active = active;
      }

      return this.saleBatchRepository.save(saleBatch);
    } catch (error) {
      throw error;
    }
  }
}
