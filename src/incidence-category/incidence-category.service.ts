import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IncidenceCategory } from './entities';
import { Repository } from 'typeorm';
import { CreateIncidenceCategoryDto } from './dtos';

@Injectable()
export class IncidenceCategoryService {
  constructor(
    @InjectRepository(IncidenceCategory)
    private readonly incidenceCategoryService: Repository<IncidenceCategory>,
  ) {}

  async createIncidenceCategory(dto: CreateIncidenceCategoryDto) {
    const incidenceCategory = this.incidenceCategoryService.create(dto as any);
    return await this.incidenceCategoryService.save(incidenceCategory);
  }
}
