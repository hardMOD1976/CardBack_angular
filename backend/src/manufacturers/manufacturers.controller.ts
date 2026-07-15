import { Controller, Get } from '@nestjs/common';
import { ManufacturersService } from './manufacturers.service';

@Controller('manufacturers')
export class ManufacturersController {

  constructor(
    private readonly manufacturersService: ManufacturersService,
  ) {}

    @Get()
    findAll() {
        return this.manufacturersService.findAll();
    }

}