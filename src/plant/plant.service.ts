import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plant } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class PlantService {
  constructor(
    @InjectRepository(Plant)
    private readonly plantRepository: Repository<Plant>,
  ) {}

  async findByProjectId(id: number) {
    const plants = await this.plantRepository
      .createQueryBuilder('plant')
      .where({proyecto: id})
      .getMany();

    if (!plants)
      throw new NotFoundException('Plant does not exists');

    return plants;
  }
}
