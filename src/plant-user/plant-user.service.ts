import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlantUser } from './entities';
import { Repository } from 'typeorm';

export interface PlantUserFilter {
  id?: number;
  instalacion?: number;
  usuario?: number;
}

@Injectable()
export class PlantUserService {
  constructor(
    @InjectRepository(PlantUser)
    private readonly plantUserRepository: Repository<PlantUser>,
  ) {}

  async getPlantUsersByFilters(data: PlantUserFilter) {
    return await this.plantUserRepository.find({
      where: {
        instalacion: {
          id: data?.instalacion,
        },
      },
      relations: ['usuario.rol', 'usuario.tipoUsuario'],
    });
  }

  async getPlantsByUserId(id: number) {
    const plants = (
      await this.plantUserRepository.find({
        where: {
          usuario: {
            id,
          },
        },
        relations: ['instalacion'],
      })
    ).map((x) => x.instalacion);

    const uniquePlants = [
      ...new Map(plants.map((plant) => [plant['id'], plant])).values(),
    ];

    return uniquePlants;
  }

  // async getDisciplinesByUserIdAndPlantId(userId: number, plantId: number) {
  //   const disciplines = (
  //     await this.plantUserRepository.find({
  //       where: {
  //         usuario: {
  //           id: userId,
  //         },
  //         instalacion: {
  //           id: plantId,
  //         },
  //       },
  //       relations: ['disciplina'],
  //     })
  //   ).map((x) => x.disciplina);

  //   const uniqueDisciplines = [
  //     ...new Map(
  //       disciplines.map((discipline) => [discipline['id'], discipline]),
  //     ).values(),
  //   ];

  //   return uniqueDisciplines;
  // }
}
