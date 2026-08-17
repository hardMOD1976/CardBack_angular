import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsIn, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '../../common/pagination';

export class OwnedFiguresQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Field used to sort the collection.',
    example: 'createdAt',
    default: 'createdAt',
    enum: [
      'createdAt',
      'condition',
      'completeness',
      'packagingState',
      'purchaseDate',
      'purchasePrice',
      'estimatedMarketValue',
      'productReleaseName',
    ],
  })
  @IsOptional()
  @IsString()
  @IsIn([
    'createdAt',
    'condition',
    'completeness',
    'packagingState',
    'purchaseDate',
    'purchasePrice',
    'estimatedMarketValue',
    'productReleaseName',
  ])
  sortBy?:
    | 'createdAt'
    | 'condition'
    | 'completeness'
    | 'packagingState'
    | 'purchaseDate'
    | 'purchasePrice'
    | 'estimatedMarketValue'
    | 'productReleaseName';

  @ApiPropertyOptional({
    description: 'Sort direction.',
    example: 'desc',
    default: 'desc',
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';

  @ApiPropertyOptional({
    description: 'Filter by owned figure condition.',
    example: 'Mint',
  })
  @IsOptional()
  @IsString()
  condition?: string;

  @ApiPropertyOptional({
    description: 'Filter by owned figure completeness.',
    example: 'Complete',
  })
  @IsOptional()
  @IsString()
  completeness?: string;

  @ApiPropertyOptional({
    description: 'Filter by owned figure packaging state.',
    example: 'Sealed',
  })
  @IsOptional()
  @IsString()
  packagingState?: string;
}