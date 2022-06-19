import { Controller, Get, Param } from '@nestjs/common';
import { PlantService } from './plant.service';

@Controller('plants')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Get('/project/:id')
  async getOne(@Param('id') id: string) {
    const data = await this.plantService.findByProjectId(Number(id));
    return data;
  }
}
