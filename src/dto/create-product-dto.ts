import { Store } from '../entity/Store';

export type CreateProductDto = {
  name: string;
  description?: string;
  image?: string;
  quantity: number;
  costPrice: string;
  sellingPrice: string;
  store?: Store;
};
