type Meta = {
  statusCode: number;
  message: string;
};

type Pagination = {
  current: string;
  totalData: number;
  totalPages: number;
};

interface ApiResponse<T> {
  success: boolean;
  meta: Meta;
  data: T;
  pagination?: Pagination;
}
