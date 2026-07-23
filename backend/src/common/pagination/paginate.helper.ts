import { PrismaService } from '../../prisma/prisma.service';

import { PaginationQueryDto } from './dto/pagination-query.dto';
import { buildPaginatedResponse } from './pagination.helper';

export async function paginate<T>(
  prisma: PrismaService,
  pagination: PaginationQueryDto,
  findManyQuery: any,
  countQuery: any,
) {
  const { page, limit } = pagination;

  const skip = (page - 1) * limit;

  const [data, total] =
    await prisma.$transaction([
      findManyQuery(skip, limit),
      countQuery(),
    ]);

  return buildPaginatedResponse(
    data,
    page,
    limit,
    total,
  );
}