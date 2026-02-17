export interface ResponseApiProps<T> {
  code: number;
  status: string;
  message: string;
  data: T;
}
