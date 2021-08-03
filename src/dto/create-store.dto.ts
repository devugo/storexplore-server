import { User } from '../entity/User';
import { IndustryType } from '../enum/IndustryType';

export type CreateStoreDto = {
  name: string;
  industry: IndustryType;
  user?: User;
};
