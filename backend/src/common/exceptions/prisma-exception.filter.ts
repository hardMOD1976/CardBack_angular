import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002':
        response.status(409).json({
          statusCode: 409,
          error: 'Conflict',
          message: 'Resource already exists.',
          field: exception.meta?.target,
        });
        return;

      case 'P2025':
        response.status(404).json({
          statusCode: 404,
          error: 'Not Found',
          message: 'Resource not found.',
        });
        return;

      default:
        response.status(500).json({
          statusCode: 500,
          error: 'Internal Server Error',
          message: 'Unexpected database error.',
        });
        return;
    }
  }
}