import { CreateIncidenceCategoryDto } from 'src/incidence-category/dtos/create-incidence-category.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Incidence } from './entities';
import { Repository } from 'typeorm';
import { CreateIncidenceDto, IncidenceQueryDto } from './dtos';
import { handlerIncidence } from './helpers';
import { IncidenceCategoryService } from 'src/incidence-category/incidence-category.service';
import { PlantService } from 'src/plant/plant.service';
import { ProjectUserService } from 'src/project-user/project-user.service';
import {
  getUsersByRole,
  getUsersByType,
  sendNotificationsToTokenArray,
} from 'src/commons/helpers';
import { UserRoles, UserTypes } from 'src/commons/enums';
import { User } from 'src/user/entities';

@Injectable()
export class IncidenceService {
  constructor(
    @InjectRepository(Incidence)
    private readonly incidenceRepository: Repository<Incidence>,
    private readonly incidenceCategoryService: IncidenceCategoryService,
    private readonly plantService: PlantService,
    private readonly projectUserService: ProjectUserService,
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
      estado: 1,
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

    //Get users by project, tipo = EMISOR, rol = 2 and  3
    const users = await this.filterUsersToSendNotification(dto.proyecto);

    //Send notification
    this.sendNotificationWhenIncidentIsCreated(users);

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
        'disciplina',
        'estado',
        'fotos',
        'disciplina',
        'incidenteCategorias.categoria',
        'fotos.usuario',
        'fotos.usuario.tipoUsuario',
        'usuarioCreador.tipoUsuario',
      ],
    });
    return incidences.map((x) => handlerIncidence(x));
  }

  async findById(id: number) {
    return await this.incidenceRepository.findOne({
      where: {
        id,
      },
      relations: [
        'proyecto',
        'instalacion',
        'zona',
        'subZona',
        'usuarioCreador',
        'proyecto.cliente',
        'disciplina',
        'estado',
        'fotos',
        'disciplina',
        'incidenteCategorias.categoria',
        'fotos.usuario',
        'fotos.usuario.tipoUsuario',
        'usuarioCreador.tipoUsuario',
      ],
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

  private async filterUsersToSendNotification(proyectoId: number) {
    let users = await this.projectUserService.getUsersByProjectId(proyectoId);
    users = getUsersByType(users, UserTypes.EMISOR);
    users = [].concat(
      getUsersByRole(users, UserRoles.NIVEL_2),
      getUsersByRole(users, UserRoles.NIVEL_3),
    );

    return users;
  }

  private async sendNotificationWhenIncidentIsCreated(users: User[]) {
    await sendNotificationsToTokenArray(
      users.map((x) => x.token),
      {
        notification: {
          title: 'A new incidence was created',
          body: 'Recently a new incidence was created.',
          sound: 'default',
        },
      },
      {
        priority: 'high',
        timeToLive: 60 * 60 * 24,
      },
    );
  }
}
