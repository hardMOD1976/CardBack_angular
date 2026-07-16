import { PartialType } from '@nestjs/mapped-types';
import { CreateLineDto } from './create-lines.dto';

export class UpdateLineDto extends PartialType(CreateLineDto) {}