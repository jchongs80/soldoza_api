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
  getUsersByType,
  sendNotificationsToTokenArray,
} from 'src/commons/helpers';
import { UserRoles, UserTypes } from 'src/commons/enums';
import { User } from 'src/user/entities';
import { UserService } from 'src/user/user.service';
import { PlantUserService } from 'src/plant-user/plant-user.service';
import { getUsersByRoles } from '../commons/helpers/user.helper';
import { CustomLoggerService } from 'src/commons/services';

@Injectable()
export class IncidenceService {

  constructor(
    @InjectRepository(Incidence)
    private readonly incidenceRepository: Repository<Incidence>,
    private readonly incidenceCategoryService: IncidenceCategoryService,
    private readonly plantService: PlantService,
    private readonly projectUserService: ProjectUserService,
    private readonly userService: UserService,
    private readonly plantUserService: PlantUserService,
    private readonly loggerService: CustomLoggerService,
  ) {}

  // Public methods
  async createIncidence(dto: CreateIncidenceDto) {
    this.loggerService.request('createIncidence', dto);

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

    // Find user creator
    const userCreator = await this.userService.findOne({
      id: dto.usuarioCreador,
    });

    // Create Incidence
    const incidence = this.incidenceRepository.create({
      ...dto,
      codIncidente: codIncidence,
      estado: userCreator.rol.id === 3 ? 1 : 2,
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

    // Manage notifications
    await this.manageSendNotifications(userCreator, dto);

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
    return handlerIncidence(
      await this.incidenceRepository.findOne({
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
      }),
    );
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

  private async filterUsersToSendNotification(
    proyectoId: number,
    rolesToSend: number[],
  ) {
    let users = await this.projectUserService.getUsersByProjectId(proyectoId);
    users = getUsersByType(users, UserTypes.EMISOR);
    users = getUsersByRoles(users, rolesToSend);

    return users;
  }

  private async sendNotificationWhenIncidentIsCreated(users: User[]) {
    await sendNotificationsToTokenArray(
      users.map((x) => x.token),
      {
        data: {
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

  private async manageSendNotifications(
    userCreator: User,
    dto: CreateIncidenceDto,
  ) {
    let users = [];
    //Get users by project, tipo = EMISOR, rol = 3
    if (userCreator.rol.id === UserRoles.NIVEL_3) {
      users = await this.filterUsersToSendNotification(dto.proyecto, [
        UserRoles.NIVEL_1,
        UserRoles.NIVEL_2,
      ]);
    }

    //Get users by project, tipo = RECEPTOR, rol = 1 and  2
    if (
      userCreator.rol.id === UserRoles.NIVEL_1 ||
      userCreator.rol.id === UserRoles.NIVEL_2
    ) {
      const plantUsers = await this.plantUserService.getPlantUsersByFilters({
        instalacion: dto.instalacion,
        disciplina: dto.disciplina,
      });

      users = plantUsers
        .filter((x) => x.usuario.tipoUsuario.id === UserTypes.RECEPTOR)
        .map((x) => x.usuario);
    }

    this.loggerService.verbose('users to send notification', {
      userCreator,
      users,
    });

    //Send notification
    this.sendNotificationWhenIncidentIsCreated(users);
  }
}
