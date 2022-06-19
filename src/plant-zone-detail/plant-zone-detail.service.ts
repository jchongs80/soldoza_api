import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlantZoneDetail } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class PlantZoneDetailService {
  constructor(
    @InjectRepository(PlantZoneDetail)
    private readonly plantZoneDetailRepository: Repository<PlantZoneDetail>,
  ) {}

  async findZonesByPlantId(id: number) {
    const details = await this.plantZoneDetailRepository.find({
      where: {
        instalacion: {
          id: id,
        },
      },
      relations: ['instalacion', 'zona'],
    });

    if (!details) throw new NotFoundException('Details does not exists');

    return details.map((x) => x.zona);
  }
}
