import { Controller, Get, Param } from '@nestjs/common';
import { SubZoneService } from './sub-zone.service';

@Controller('sub-zones')
export class SubZoneController {
  constructor(private readonly subZoneService: SubZoneService) {}

  @Get('/zone/:id')
  async getOne(@Param('id') id: string) {
    const data = await this.subZoneService.findByZoneId(Number(id));
    return data;
  }
}
