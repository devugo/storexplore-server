export type GetSalesFilterDto = {
  date: Date | string;
  page?: string;
  startDate?: Date;
  endDate?: Date;
  product?: string;
  saleManager?: string;
};
