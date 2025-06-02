export interface IHttpResponse extends IHttpErrorResponse {
  data: any;
  response?: any;
  result?: any;
  isSuccess?: any;
  output?: any;
  products?: any[];
}

export interface IHttpErrorResponse {
  errors: any;
  httpStatusCode: number;
  message: string;
  messages: any;
}
