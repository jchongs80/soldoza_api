import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubZone } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class SubZoneService {
  constructor(
    @InjectRepository(SubZone)
    private readonly subZoneRepository: Repository<SubZone>,
  ) {}

  async findByZoneId(id: number) {
    const zones = await this.subZoneRepository
      .createQueryBuilder('subZone')
      .where({
        zona: {
          id: id,
        },
      })
      .getMany();

    if (!zones) throw new NotFoundException('Zones does not exists');

    return zones;
  }
}
