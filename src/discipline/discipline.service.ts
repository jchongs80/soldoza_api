import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Discipline } from './entities/discipline.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DisciplineService {
  constructor(
    @InjectRepository(Discipline)
    private readonly disciplineRepository: Repository<Discipline>,
  ) {}

  async getDisciplines() {
    return await this.disciplineRepository.find({});
  }
}
