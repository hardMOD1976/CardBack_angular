import { PaginationMetaDto } from './dto/pagination-meta.dto';
import { PaginatedResponseDto } from './dto/paginated-response.dto';

export function buildPaginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number,
): PaginatedResponseDto<T> {
  const meta = new PaginationMetaDto();

  meta.page = page;
  meta.limit = limit;
  meta.total = total;
  meta.totalPages = Math.ceil(total / limit);

  return new PaginatedResponseDto<T>(
    data,
    meta,
  );
}