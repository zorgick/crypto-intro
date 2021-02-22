import {
  EMPTY_RESPONSE_ERROR,
  HTTP_ERROR,
  NOT_AUTHORIZED_ERROR,
  UNKNOWN_ERROR,
} from 'src/constants';

import { RevealErrorType, IdentifyErrorType } from '../types';

export class HttpError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HttpError';
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export class BadResponseError extends HttpError {
  constructor(status: string, serverErrorMessage?: string) {
    let message = `${status} - Some required data is missing.`;
    if (serverErrorMessage) {
      message = serverErrorMessage;
    }
    super(message);
    this.name = 'BadResponseError';
    Object.setPrototypeOf(this, BadResponseError.prototype);
  }
}

export class AccessDeniedError extends HttpError {
  constructor(status: string, serverErrorMessage?: string) {
    let message = `${status} - User is not authenticated`;
    if (serverErrorMessage) {
      message = serverErrorMessage;
    }
    super(message);
    this.name = 'AccessDeniedError';
    Object.setPrototypeOf(this, AccessDeniedError.prototype);
  }
}

export class ForbiddenError extends HttpError {
  constructor(status: string, serverErrorMessage?: string) {
    let message = `${status} - Request is not authorized.`;
    if (serverErrorMessage) {
      message = serverErrorMessage;
    }
    super(message);
    this.name = 'ForbiddenError';
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class NotFoundError extends HttpError {
  constructor(status: string, serverErrorMessage?: string) {
    let message = `${status} - The requested resource is not found.`;
    if (serverErrorMessage) {
      message = serverErrorMessage;
    }
    super(message);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class BadRequestError extends HttpError {
  constructor(status: string, serverErrorMessage?: string) {
    let message = `${status} - Bad request was sent.`;
    if (serverErrorMessage) {
      message = serverErrorMessage;
    }
    super(message);
    this.name = 'BadRequestError';
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class ServerError extends HttpError {
  constructor(status: string, serverErrorMessage?: string) {
    let message = `${status} - Server malfunction indicated.`;
    if (serverErrorMessage) {
      message = serverErrorMessage;
    }
    super(message);
    this.name = 'ServerError';
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

export class ConflictError extends HttpError {
  constructor(status: string, serverErrorMessage?: string) {
    let message = `${status} - Current state of the target reource is already modified.`;
    if (serverErrorMessage) {
      message = serverErrorMessage;
    }
    super(message);
    this.name = 'ConflictError';
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

// use only inside catch environment
export const revealError: RevealErrorType = ({
  status = 0, traceId, message, errorOptions,
}) => {
  const errorsMap = new Map([
    [0, BadResponseError],
    [400, BadRequestError],
    [401, AccessDeniedError],
    [403, ForbiddenError],
    [404, NotFoundError],
    [409, ConflictError],
    [500, ServerError],
  ]);
  let resultError: any;
  if (errorsMap.has(status)) {
    const ErrorConstructor = errorsMap.get(status);
    if (ErrorConstructor) {
      const errorInstance = new ErrorConstructor(
        `${status}:${traceId || ''}`,
        errorOptions?.showServerMessage ? message : undefined,
      );
      resultError = errorInstance;
    }
  } else {
    resultError = new Error(`${status} - Unknown HTTP error`);
  }

  if (errorOptions?.viewOnly) {
    resultError = resultError.message.substring(resultError.message.indexOf('- ') + 1);
  }
  return resultError;
};

// use only inside catch environment
export const identifyError: IdentifyErrorType = (error, options) => {
  const identifiedError = {
    logout: false,
    message: '',
  };

  switch (error.constructor) {
    case AccessDeniedError:
      identifiedError.logout = true;
      identifiedError.message = options?.accessError || options?.genericError || NOT_AUTHORIZED_ERROR;
      break;
    case BadRequestError:
      identifiedError.message = options?.badRequestError || options?.genericError || HTTP_ERROR;
      break;
    case NotFoundError:
      identifiedError.message = options?.notFoundError || options?.genericError || HTTP_ERROR;
      break;
    case ServerError:
      identifiedError.message = options?.serverError || options?.genericError || HTTP_ERROR;
      break;
    case BadResponseError:
      identifiedError.message = options?.badResponseError || options?.genericError || EMPTY_RESPONSE_ERROR;
      break;
    default:
      identifiedError.message = UNKNOWN_ERROR;
  }
  return identifiedError;
};
