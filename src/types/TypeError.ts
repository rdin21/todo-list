export type TError = {
  message: string;
  statusCode: number;
};

export interface ErrorType {
  data: TError | string[];
  status: number;
}
