import { Controller, Get, Param } from '@nestjs/common';
import { ProjectUserService } from './project-user.service';

@Controller('project-users')
export class ProjectUserController {
  constructor(private readonly projectUserService: ProjectUserService) {}

  @Get('user/:id/projects')
  public async getProjectsByUserId(@Param('id') id: string) {
    return await this.projectUserService.getProjectsByUserId(Number(id));
  }
}
