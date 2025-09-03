export interface ResponseType<T> {
  code: number;
  success: boolean;
  message?: string | Array<object>;
  data?: T;
}
