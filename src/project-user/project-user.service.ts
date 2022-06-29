import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectUser } from './entities';

@Injectable()
export class ProjectUserService {
  constructor(
    @InjectRepository(ProjectUser)
    private readonly projectUserRepository: Repository<ProjectUser>,
  ) {}

  async getProjectsByUserId(id: number) {
    const detail = await this.projectUserRepository.find({
      where: {
        usuario: {
          id,
        },
      },
      relations: ['proyecto', 'proyecto.cliente'],
    });

    return detail.map((x) => x.proyecto);
  }
}
