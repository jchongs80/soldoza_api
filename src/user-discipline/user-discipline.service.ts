import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDiscipline } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserDisciplineService {
  constructor(
    @InjectRepository(UserDiscipline)
    private readonly userDisciplineRepository: Repository<UserDiscipline>,
  ) {}

  async getDisciplinesByUserId(id: number) {
    const disciplines = (
      await this.userDisciplineRepository.find({
        where: {
          usuario: {
            id,
          },
        },
        relations: ['disciplina'],
      })
    ).map((x) => x.disciplina);

    const uniqueDisciplines = [
      ...new Map(
        disciplines.map((discipline) => [discipline['id'], discipline]),
      ).values(),
    ];

    return uniqueDisciplines;
  }

  async getUsersByDisciplineId(id: number) {
    const users = (
      await this.userDisciplineRepository.find({
        where: {
          disciplina: {
            id,
          },
        },
        relations: ['usuario'],
      })
    ).map((x) => x.usuario);

    const uniqueUsers = [
      ...new Map(users.map((user) => [user['id'], user])).values(),
    ];

    return uniqueUsers;
  }
}
