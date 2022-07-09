import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TraceLogger } from 'src/commons/decorators';
import { CreateIncidenceDto, IncidenceQueryDto } from './dtos';
import { IncidenceService } from './incidence.service';

@Controller('incidences')
export class IncidenceController {
  constructor(private readonly incidenceService: IncidenceService) {}

  @Post()
  @TraceLogger
  async createAccident(@Body() dto: CreateIncidenceDto) {
    const incidenceCreated = await this.incidenceService.createIncidence(dto);

    return incidenceCreated;
  }

  @Get('find-by-filters')
  @TraceLogger
  async findByFilters(@Query() query: IncidenceQueryDto) {
    return await this.incidenceService.findByFilters(query);
  }

  @Get(':id')
  @TraceLogger
  async getIncidenceById(@Param('id') id: string) {
    const incidence = await this.incidenceService.findById(Number(id));

    return incidence;
  }
}
