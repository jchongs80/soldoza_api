import { CreateIncidenceCategoryDto } from './../incidence-category/dtos/create-incidence-category.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Incidence } from './entities';
import { Repository } from 'typeorm';
import { CreateIncidenceDto, IncidenceQueryDto } from './dtos';
import { handlerIncidence } from './helpers';
import { IncidenceCategoryService } from 'src/incidence-category/incidence-category.service';
import { PlantService } from 'src/plant/plant.service';

@Injectable()
export class IncidenceService {
  constructor(
    @InjectRepository(Incidence)
    private readonly incidenceRepository: Repository<Incidence>,
    private readonly incidenceCategoryService: IncidenceCategoryService,
    private readonly plantService: PlantService,
  ) {}

  // Public methods

  async createIncidence(dto: CreateIncidenceDto) {
    // Get plant
    const plant = await this.plantService.findPlantById(dto.instalacion);

    // Handler columns
    const amountOfIncidencesByPlantId = (
      await this.getIncidencesByPlantId(dto.instalacion)
    ).length;
    const codIncidence =
      'I -' +
      plant.codInstalacion +
      '-' +
      String(amountOfIncidencesByPlantId + 1);

    // Create Incidence
    const incidence = this.incidenceRepository.create({
      ...dto,
      codIncidente: codIncidence,
      estado: 1
    } as any);
    const incidenceCreated: any = await this.incidenceRepository.save(
      incidence,
    );

    // Map with categories
    for await (const categoryId of dto.categorias) {
      const format: CreateIncidenceCategoryDto = {
        incidente: incidenceCreated.id,
        categoria: categoryId,
      };
      await this.incidenceCategoryService.createIncidenceCategory(format);
    }
    return incidenceCreated;
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

  async findById(id: number) {
    return await this.incidenceRepository.findOneBy({
      id,
    });
  }

  // Private methods
  private async getIncidencesByPlantId(id: number) {
    const incidences = await this.incidenceRepository.find({
      where: {
        instalacion: {
          id,
        },
      },
    });

    return incidences;
  }
}
