export type PaginationParams = {
  page?: number;
  pageSize?: number;
};

export type PaginationResponse<DataType> = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: DataType[];
};
