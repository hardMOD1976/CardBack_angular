import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { GlobalSearchService } from './global-search.service';

import { GlobalSearchQueryDto } from './dto/global-search-query.dto';

import { GlobalSearchResultDto } from './dto/global-search-result.dto';

import { PaginatedResponseDto } from '../common/pagination';

@ApiTags('Global Search')
@ApiBearerAuth('access-token')
@Controller('search')
export class GlobalSearchController {
  constructor(
    private readonly globalSearchService: GlobalSearchService,
  ) {}

  @ApiOperation({
    summary: 'Search the catalog globally',
    description:
      'Searches across franchises, manufacturers, lines, characters, figures, variants and product releases.',
    operationId: 'globalSearch',
  })
  @ApiOkResponse({
    description: 'Search results retrieved successfully.',
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(PaginatedResponseDto),
        },
        {
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: getSchemaPath(
                  GlobalSearchResultDto,
                ),
              },
            },
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid search parameters.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get()
  search(
    @Query() query: GlobalSearchQueryDto,
  ) {
    return this.globalSearchService.search(query);
  }
}