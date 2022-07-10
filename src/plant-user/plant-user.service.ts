import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlantUser } from './entities';
import { Repository } from 'typeorm';

export interface PlantUserFilter {
  id?: number;
  instalacion?: number;
  usuario?: number;
  disciplina?: number;
}

@Injectable()
export class PlantUserService {
  constructor(
    @InjectRepository(PlantUser)
    private readonly plantUserRepository: Repository<PlantUser>,
  ) {}

  async getPlantUsersByFilters(data: PlantUserFilter) {
    return this.plantUserRepository.find({
      where: {
        instalacion: {
          id: data?.instalacion,
        },
        disciplina: {
          id: data?.disciplina,
        },
      },
      relations: ['usuario.rol', 'usuario.tipoUsuario'],
    });
  }
}
