import axios, { AxiosError } from "axios";
import type { AxiosResponse } from "axios";

import { ERROR_MESSAGE } from "../constant/service";
import type { IHttpErrorResponse, IHttpResponse } from "../models/IApiResponse";
import Util from "../utils/util";

const http = {
  get: async (apiBaseURL: string, url: string, ...args: any[]): Promise<IHttpResponse> => {
    return axios
      .get<IHttpResponse>(`${apiBaseURL}/${Util.stringFormat(url, ...args)}`)
      .then(responseHandler.getSuccessHandler)
      .catch(responseHandler.errorHandler);
  },
  post: async (apiBaseURL: string, url: string, data: any, ...args: any[]): Promise<IHttpResponse> => {
    return axios
      .post<IHttpResponse>(`${apiBaseURL}/${Util.stringFormat(url, ...args)}`, data)
      .then(responseHandler.postSuccessHandler)
      .catch(responseHandler.errorHandler);
  },
};

const setErrorStatus = (statusCode: number, ErrorCode: string): IHttpResponse => {
  const errorResponse = {} as IHttpResponse;
  errorResponse.httpStatusCode = statusCode;
  errorResponse.message = ErrorCode;
  return errorResponse;
};

const handleError = (error: AxiosError<IHttpErrorResponse>): IHttpResponse => {
  if (error.code === ERROR_MESSAGE.ERR_NETWORK) {
    return setErrorStatus(503, ERROR_MESSAGE.STATUS_MESSAGES[503]);
  } else {
    const statusCode = error.response?.status ? error.response?.status : 500;
    const errorCode = error.response?.data.message ? error.response?.data.message : ERROR_MESSAGE.STATUS_MESSAGES[500];
    return setErrorStatus(statusCode, errorCode);
  }
};

const responseHandler = {
  getSuccessHandler: (response: AxiosResponse) => {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return handleError(new AxiosError());
    }
  },
  postSuccessHandler: (response: AxiosResponse) => {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return handleError(new AxiosError());
    }
  },
  errorHandler: handleError,
};

export default http;
