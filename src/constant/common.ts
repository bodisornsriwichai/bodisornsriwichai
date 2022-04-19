import { HttpStatus } from '@nestjs/common';

export const HTTP_RESPONSE = {
  CODE_200: `Success`,
  CODE_201: `Created`,

  CODE_400: `Bad Request`,
  CODE_403: `Forbidden`,
  CODE_404: `Not Found`,
  CODE_409: `Conflict`,

  CODE_503: `Service Unavailable`,
};

export const STATUS = {
  ACIIVE: 'active',
  INACIIVE: 'inactive',
};

export const SLOT = {
  EMPTY: 'empty',
  FULL: 'full',
};

export const CAR_SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

export enum CAR_SIZE_ENUM {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum STATUS_ENUM {
  ACIIVE = 'active',
  INACIIVE = 'inactive',
}

export const CODE_200 = {
  statusCode: HttpStatus.OK,
  message: HTTP_RESPONSE.CODE_200,
};

export const CODE_201 = {
  statusCode: HttpStatus.CREATED,
  message: HTTP_RESPONSE.CODE_201,
};

export const CODE_400 = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: HTTP_RESPONSE.CODE_400,
};

export const CODE_403 = {
  statusCode: HttpStatus.FORBIDDEN,
  message: HTTP_RESPONSE.CODE_403,
};

export const CODE_404 = {
  statusCode: HttpStatus.NOT_FOUND,
  message: HTTP_RESPONSE.CODE_404,
};

export const CODE_503 = {
  statusCode: HttpStatus.SERVICE_UNAVAILABLE,
  message: HTTP_RESPONSE.CODE_503,
};
