import { Store } from '../entity/Store';

export type CreateSaleBatchDto = {
  date: string;
  store?: Store;
};
