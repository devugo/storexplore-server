import { ERROR_CODE } from '../constant/ERROR_CODE';

export const throwError = (
  errorObj: any,
  message?: string,
): { code: number; message: string } => {
  if (errorObj.code === ERROR_CODE.conflict) {
    return {
      code: 409,
      message: message || 'Resource already exists',
    };
  } else if (errorObj.code === ERROR_CODE.notFound) {
    return {
      code: 404,
      message: message || 'Resource not found',
    };
  } else if (errorObj.code === ERROR_CODE.unathorize) {
    return {
      code: 403,
      message: message || 'Unathorized',
    };
  } else {
    return {
      code: 500,
      message: message || 'Internal Server Error',
    };
  }
};
