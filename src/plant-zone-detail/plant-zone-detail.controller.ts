import { Controller, Get, Param } from '@nestjs/common';
import { PlantZoneDetailService } from './plant-zone-detail.service';

@Controller('plant-zone-details')
export class PlantZoneDetailController {
  constructor(
    private readonly plantZoneDetailService: PlantZoneDetailService,
  ) {}

  @Get('/plant/:id/zones')
  async getOne(@Param('id') id: string) {
    const data = await this.plantZoneDetailService.findZonesByPlantId(
      Number(id),
    );
    return data;
  }
}
