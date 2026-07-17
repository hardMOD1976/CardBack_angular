import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { FiguresService } from './figures.service';
import { CreateFigureDto } from './dto/create-figure.dto';
import { UpdateFigureDto } from './dto/update-figure.dto';

@Controller('figures')
export class FiguresController {
  constructor(private readonly figuresService: FiguresService) {}

  @Get()
  findAll() {
    return this.figuresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.figuresService.findOne(id);
  }

  @Post()
  create(@Body() createFigureDto: CreateFigureDto) {
    return this.figuresService.create(createFigureDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateFigureDto: UpdateFigureDto,
  ) {
    return this.figuresService.update(id, updateFigureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.figuresService.remove(id);
  }
}