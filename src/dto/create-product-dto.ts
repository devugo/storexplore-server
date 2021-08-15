import { Store } from '../entity/Store';

export type CreateProductDto = {
  name: string;
  description?: string;
  image?: string;
  quantity: string;
  costPrice: string;
  sellingPrice: string;
  store?: Store;
};
