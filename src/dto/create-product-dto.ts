import { Store } from '../entity/Store';

export type CreateProductDto = {
  name: string;
  description?: string;
  image?: string;
  costPrice: string;
  sellingPrice: string;
  store?: Store;
};
