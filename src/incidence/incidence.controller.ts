import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateIncidenceDto, IncidenceQueryDto } from './dtos';
import { IncidenceService } from './incidence.service';

@Controller('incidences')
export class IncidenceController {
  constructor(private readonly incidenceService: IncidenceService) {}

  @Post()
  async createAccident(@Body() dto: CreateIncidenceDto) {
    const incidenceCreated = await this.incidenceService.createIncidence(dto);

    return incidenceCreated;
  }

  @Get('find-by-filters')
  async findByFilters(@Query() query: IncidenceQueryDto) {
    return await this.incidenceService.findByFilters(query);
  }

  @Get(':id')
  async getIncidenceById(@Param('id') id: string) {
    const incidence = await this.incidenceService.findById(Number(id));

    return incidence;
  }

}
