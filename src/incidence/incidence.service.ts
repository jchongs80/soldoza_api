import { CreateIncidenceCategoryDto } from 'src/incidence-category/dtos/create-incidence-category.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Incidence } from './entities';
import { Repository } from 'typeorm';
import {
  CreateIncidenceDto,
  EditIncidenceDto,
  IncidenceQueryDto,
} from './dtos';
import { handlerIncidence } from './helpers';
import { IncidenceCategoryService } from 'src/incidence-category/incidence-category.service';
import { PlantService } from 'src/plant/plant.service';
import { ProjectUserService } from 'src/project-user/project-user.service';
import {
  getUsersByType,
  sendNotificationsToTokenArray,
} from 'src/commons/helpers';
import { IncidenceState, UserRoles, UserTypes } from 'src/commons/enums';
import { User } from 'src/user/entities';
import { UserService } from 'src/user/user.service';
import { PlantUserService } from 'src/plant-user/plant-user.service';
import { getUsersByRoles } from '../commons/helpers/user.helper';
import { CustomLoggerService } from 'src/logger-config/services';
import { UserDisciplineService } from 'src/user-discipline/user-discipline.service';

export interface IncidenceDescriptionMessage {
  incidencia?: string;
  proyecto?: string;
  instalacion?: string;
  zona?: string;
  subzona?: string;
  disciplina?: string;
}

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
    private readonly userDisciplineService: UserDisciplineService,
  ) {}

  // Public methods

  async createIncidence(dto: CreateIncidenceDto) {
    // this.loggerService.request('createIncidence', dto);

    // Get plant
    const plant = await this.plantService.findPlantById(dto.instalacion);

    // Handler columns
    const amountOfIncidencesByPlantId = (
      await this.getIncidencesByPlantId(dto.instalacion)
    ).length;

    const codIncidence =
      'WO-' +
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
      estado: userCreator.rol.id === UserRoles.NIVEL_3 ? 1 : 2,
      usuarioApproved:
        userCreator.rol.id === UserRoles.NIVEL_3 ? null : dto.usuarioCreador,
      fechaApproved:
        userCreator.rol.id === UserRoles.NIVEL_3 ? null : dto.fechaIncidencia,
    } as any);

    const incidenceCreated: any = await this.incidenceRepository.save(
      incidence,
    );

    const incidenceCreatedFound = await this.findById(incidenceCreated.id);

    // Map with categories
    for await (const categoryId of dto.categorias) {
      const format: CreateIncidenceCategoryDto = {
        incidente: incidenceCreated.id,
        categoria: categoryId,
      };
      await this.incidenceCategoryService.createIncidenceCategory(format);
    }

    // Manage notifications
    await this.manageSendNotifications(
      userCreator,
      incidenceCreatedFound,
      incidenceCreated?.id,
    );

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
        disciplina: {
          id: dto?.disciplinaId || null,
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
      order: {
        id: 'DESC',
      },
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

  async updateIncidenceById(id: number, dto: EditIncidenceDto) {
    const incidecenUpdated = await this.incidenceRepository.update(
      { id },
      dto as any,
    );

    const incidenceFound = await this.incidenceRepository.findOne({
      where: {
        id,
      },
      relations: ['instalacion', 'proyecto', 'zona', 'subZona', 'disciplina'],
    });

    switch (dto?.estado) {
      case IncidenceState.APPROVED: {
        const users = (
          await this.plantUserService.getPlantUsersByFilters({
            instalacion: incidenceFound.instalacion.id,
          })
        )
          .filter((x) => x.usuario.tipoUsuario.id === UserTypes.RECEPTOR)
          .map((x) => x.usuario);

        const uniqueUsers = [
          ...new Map(users.map((user) => [user['id'], user])).values(),
        ];

        this.loggerService.verbose('users to send notification (Edit)', {
          uniqueUsers,
        });

        await sendNotificationsToTokenArray(
          uniqueUsers.map((user) => user.token),
          {
            data: {
              title: `${incidenceFound.codIncidente} was APPROVED`,
              body: `${incidenceFound.proyecto.codProyecto} / ${incidenceFound.instalacion.codInstalacion} / ${incidenceFound.zona.codZona} / ${incidenceFound.subZona.codSubzona} / ${incidenceFound.disciplina.codDisciplina}`,
              sound: 'default',
            },
          },
          {
            priority: 'high',
            timeToLive: 60 * 60 * 24,
          },
        );

        break;
      }

      case IncidenceState.CORRECTED: {
        let users = await this.filterUsersToSendNotification(
          incidenceFound.proyecto.id,
          [UserRoles.NIVEL_1, UserRoles.NIVEL_2],
        );

        users = [...new Map(users.map((user) => [user['id'], user])).values()];

        this.loggerService.verbose('users to send notification (Edit)', {
          users,
        });

        await sendNotificationsToTokenArray(
          users.map((user) => user.token),
          {
            data: {
              title: `${incidenceFound.codIncidente} was CORRECTED`,
              body: `${incidenceFound.proyecto.codProyecto} / ${incidenceFound.instalacion.codInstalacion} / ${incidenceFound.zona.codZona} / ${incidenceFound.subZona.codSubzona} / ${incidenceFound.disciplina.codDisciplina}`,
              sound: 'default',
            },
          },
          {
            priority: 'high',
            timeToLive: 60 * 60 * 24,
          },
        );
      }
      default:
        break;
    }

    return incidecenUpdated;
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

  public async filterUsersToSendNotification(
    proyectoId: number,
    rolesToSend: number[],
  ) {
    let users = await this.projectUserService.getUsersByProjectId(proyectoId);
    users = getUsersByType(users, UserTypes.EMISOR);
    users = getUsersByRoles(users, rolesToSend);

    return users;
  }

  private async sendNotificationWhenIncidentIsCreated(
    users: User[],
    wasUpdated: boolean,
    incidenceMessage?: IncidenceDescriptionMessage,
  ) {
    await sendNotificationsToTokenArray(
      users.map((x) => x.token),
      {
        data: {
          title: `${incidenceMessage.incidencia} was ${
            wasUpdated ? 'APPROVED' : 'CREATED'
          }`,
          body: `${incidenceMessage.proyecto} / ${incidenceMessage.instalacion} / ${incidenceMessage.zona} / ${incidenceMessage.subzona} / ${incidenceMessage.disciplina}`,
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
    dto: Incidence,
    incidenceId?: number,
  ) {
    let users = [];
    //Get users by project, tipo = EMISOR, rol = 3
    if (userCreator.rol.id === UserRoles.NIVEL_3) {
      users = await this.filterUsersToSendNotification(dto.proyecto.id, [
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
        instalacion: dto.instalacion.id,
        // disciplina: dto.disciplina.id,
      });

      users = plantUsers
        .filter((x) => x.usuario.tipoUsuario.id === UserTypes.RECEPTOR)
        .map((x) => x.usuario);
    }

    // Filter unique users
    users = [...new Map(users.map((user) => [user['id'], user])).values()];

    // Filter users with the same discipline
    const userDisciplines =
      await this.userDisciplineService.getUsersByDisciplineId(
        dto?.disciplina.id,
      );

    users = userDisciplines.filter((x) => {
      return users.some((y) => {
        return x.id === y.id;
      });
    });

    this.loggerService.verbose('users to send notification', {
      userCreator,
      users,
    });

    //Send notification
    this.sendNotificationWhenIncidentIsCreated(
      users,
      userCreator.rol.id === UserRoles.NIVEL_1 ||
        userCreator.rol.id === UserRoles.NIVEL_2,
      {
        incidencia: dto.codIncidente,
        proyecto: dto.proyecto.codProyecto,
        instalacion: dto.instalacion.codInstalacion,
        zona: dto.zona.codZona,
        subzona: dto.subZona.codSubzona,
        disciplina: dto.disciplina.codDisciplina,
      },
    );
  }
}
