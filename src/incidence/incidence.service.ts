import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Incidence } from './entities';
import { Repository } from 'typeorm';
import { CreateIncidenceDto, IncidenceQueryDto } from './dtos';
import { handlerIncidence } from './helpers';

@Injectable()
export class IncidenceService {
  constructor(
    @InjectRepository(Incidence)
    private readonly incidenceRepository: Repository<Incidence>,
  ) {}

  //Public methods

  async createIncidence(dto: CreateIncidenceDto) {
    const incidence = this.incidenceRepository.create(dto as any);
    return await this.incidenceRepository.save(incidence);
  }

  async findByFilters(dto: IncidenceQueryDto) {
    const incidences = await this.incidenceRepository.find({
      where: {
        proyecto: {
          id: dto?.proyectoId || null,
        },
        instalacion: {
          id: dto?.instalacionId || null,
        },
        zona: {
          id: dto?.zonaId || null,
        },
        subZona: {
          id: dto?.subZonaId || null,
        },
        usuarioCreador: {
          id: dto?.usuarioCreadorId || null,
        },
      },
      relations: [
        'proyecto',
        'instalacion',
        'zona',
        'subZona',
        'usuarioCreador',
        'proyecto.cliente',
      ],
    });
    return incidences.map((x) => handlerIncidence(x));
  }
}
