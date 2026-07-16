import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ManufacturersService } from './manufacturers.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Controller('manufacturers')
export class ManufacturersController {
  constructor(private readonly manufacturersService: ManufacturersService) {}

  @Get()
  findAll() {
    return this.manufacturersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manufacturersService.findOne(id);
  }

  @Post()
  create(@Body() createManufacturerDto: CreateManufacturerDto) {
    return this.manufacturersService.create(createManufacturerDto);
  }

  @Put(':id')
update(
  @Param('id') id: string,
  @Body() updateManufacturerDto: UpdateManufacturerDto,
) {
  return this.manufacturersService.update(
    id,
    updateManufacturerDto,
  );
}

@Delete(':id')
remove(@Param('id') id: string) {
  return this.manufacturersService.remove(id);
}

}