export interface ResponseType<T> {
  code: number;
  success: boolean;
  message?: string | Array<any>;
  data?: T;
}
