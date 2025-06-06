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
  PRODUCT_EXIST: {
    code: 'TRAPP_ERR_7',
    httpStatus: 404,
    message: 'Product is existing',
  },
  PRODUCT_NOT_FOUND: {
    code: 'TRAPP_ERR_8',
    httpStatus: 404,
    message: 'Product not found',
  },
  UPLOAD_SUCCESS: {
    code: 'TRAPP_SUCC_9',
    httpStatus: 200,
    message: 'Upload',
  },
  UPLOAD_S3_ERROR: {
    code: 'TRAPP_ERR_10',
    httpStatus: 500,
    message: 'Unexpected error uploading product image',
  },
  DELETE_S3_ERROR: {
    code: 'TRAPP_ERR_11',
    httpStatus: 500,
    message: 'Unexpected error deleting product image',
  },
  ORDER_NO_ITEMS: {
    code: 'TRAPP_ERR_12',
    httpStatus: 400,
    message: 'Cannot process order: no products were provided.',
  },
  ORDER_NOT_FOUND: {
    code: 'TRAPP_ERR_13',
    httpStatus: 400,
    message: 'Order not found',
  },
  TRANSACTION_NOT_FOUND: {
    code: 'TRAPP_ERR_14',
    httpStatus: 400,
    message: 'Transaction not found',
  },
  TRANSACTION_EXIST: {
    code: 'TRAPP_ERR_15',
    httpStatus: 400,
    message: 'There is already a pending transaction for this order.',
  },
  ORDER_PENDING_EXIST: {
    code: 'TRAPP_ERR_16',
    httpStatus: 400,
    message: 'There is already a pending for order.',
  },
} as const;
