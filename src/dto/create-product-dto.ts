import { Store } from '../entity/Store';

export type CreateProductDto = {
  name: string;
  description?: string;
  image?: string;
  quantity: number;
  costPrice: number;
  sellingPrice: number;
  store?: Store;
};
