import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { LinesService } from './lines.service';
import { CreateLineDto } from './dto/create-lines.dto';
import { UpdateLineDto } from './dto/update-lines.dto';

@Controller('lines')
export class LinesController {
  constructor(private readonly linesService: LinesService) {}

  @Get()
  findAll() {
    return this.linesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateLineDto) {
    return this.linesService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateLineDto,
  ) {
    return this.linesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linesService.remove(id);
  }
}