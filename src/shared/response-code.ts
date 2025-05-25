export interface ResponseCode {
  code: string;
  httpStatus: number;
  message: string;
}

export const ResponseCodes = {
  DATABASE_ERROR: {
    code: 'TRAPP_ERR_1',
    httpStatus: 500,
    message: 'Database error',
  },
  USER_NOT_FOUND: {
    code: 'TRAPP_ERR_2',
    httpStatus: 404,
    message: 'User not found',
  },
  USER_EXIST: {
    code: 'TRAPP_ERR_3',
    httpStatus: 404,
    message: 'User is existing',
  },
  TRANSACTION_SUCCESS: {
    code: 'TRAPP_SUCC_4',
    httpStatus: 200,
    message: 'Ok',
  },
  UNEXPECTED_ERROR: {
    code: 'TRAPP_ERR_5',
    httpStatus: 500,
    message: 'Unexpected error',
  },
  VALIDATION_ERROR: {
    code: 'TRAPP_ERR_5',
    httpStatus: 400,
    message: 'Validation error',
  },
  CREATE_TRANSACTION: {
    code: 'TRAPP_SUCC_6',
    httpStatus: 201,
    message: 'Created',
  },
} as const;
