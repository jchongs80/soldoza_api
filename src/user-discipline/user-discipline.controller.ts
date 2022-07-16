import { Controller, Get, Param } from '@nestjs/common';
import { UserDisciplineService } from './user-discipline.service';

@Controller('user-disciplines')
export class UserDisciplineController {
  constructor(private readonly userDisciplineService: UserDisciplineService) {}

  @Get('user/:id/disciplines')
  async getDisciplinesByUserId(@Param('id') id: string) {
    return await this.userDisciplineService.getDisciplinesByUserId(Number(id));
  }
}
