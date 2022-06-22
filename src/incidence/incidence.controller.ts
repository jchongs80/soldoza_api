import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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
}
