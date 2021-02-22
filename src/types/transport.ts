import {
  ParamsWithErrorOptions,
} from './index';

export type DisplayedErrorType = Partial<{
  accessError: string;
  badRequestError: string;
  notFoundError: string;
  serverError: string;
  badResponseError: string;
  genericError: string;
}>;

export type RevealErrorType =
  (params: ParamsWithErrorOptions & { status: number; message: string; traceId?: string; }) => any;
export type IdentifyErrorType = (error: any, option?: DisplayedErrorType) => {
  logout: boolean;
  message: string;
};
