import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { OwnedFiguresService } from './owned-figures.service';

import { CreateOwnedFigureDto } from './dto/create-owned-figure.dto';
import { UpdateOwnedFigureDto } from './dto/update-owned-figure.dto';

@Controller('owned-figures')
export class OwnedFiguresController {
  constructor(
    private readonly ownedFiguresService: OwnedFiguresService,
  ) {}

  @Get()
  findAll() {
    return this.ownedFiguresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownedFiguresService.findOne(id);
  }

  @Post()
  create(
    @Body()
    dto: CreateOwnedFigureDto,
  ) {
    return this.ownedFiguresService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    dto: UpdateOwnedFigureDto,
  ) {
    return this.ownedFiguresService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownedFiguresService.remove(id);
  }
}