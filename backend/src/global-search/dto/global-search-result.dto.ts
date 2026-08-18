import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type GlobalSearchResultType =
  | 'franchise'
  | 'manufacturer'
  | 'line'
  | 'character'
  | 'figure'
  | 'variant'
  | 'productRelease';

export class GlobalSearchContextDto {
  @ApiPropertyOptional({
    example: 'Star Wars',
  })
  franchise?: string;

  @ApiPropertyOptional({
    example: 'Hasbro',
  })
  manufacturer?: string;

  @ApiPropertyOptional({
    example: 'The Vintage Collection',
  })
  line?: string;

  @ApiPropertyOptional({
    example: 'Luke Skywalker',
  })
  character?: string;

  @ApiPropertyOptional({
    example: 'Luke Skywalker',
  })
  figure?: string;

  @ApiPropertyOptional({
    example: 'Luke Skywalker - X-Wing Pilot',
  })
  variant?: string;
}

export class GlobalSearchResultDto {
  @ApiProperty({
    example: 'cmf9ja8oq0000efgh12345678',
  })
  id!: string;

  @ApiProperty({
    enum: [
      'franchise',
      'manufacturer',
      'line',
      'character',
      'figure',
      'variant',
      'productRelease',
    ],
    example: 'character',
  })
  type!: GlobalSearchResultType;

  @ApiProperty({
    example: 'Luke Skywalker',
  })
  name!: string;

  @ApiProperty({
    nullable: true,
    example: 'https://example.com/luke.jpg',
  })
  imageUrl!: string | null;

  @ApiProperty({
    type: GlobalSearchContextDto,
  })
  context!: GlobalSearchContextDto;
}