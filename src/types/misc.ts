export type ParamsWithErrorOptions = {
  errorOptions?: {
    viewOnly?: boolean;
    showServerMessage?: boolean;
    ignoreBadResponse?: boolean;
  };
};

export type GeneralParams = Record<string, any>;

export type ResponseErrorType = {
  error?: {
    code: number;
    message: string;
  };
}
