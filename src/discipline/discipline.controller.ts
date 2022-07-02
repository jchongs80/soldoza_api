import { DisciplineService } from './discipline.service';
import { Controller, Get } from '@nestjs/common';

@Controller('disciplines')
export class DisciplineController {
  constructor(private readonly disciplineService: DisciplineService) {}

  @Get()
  async getDisciplines() {
    return await this.disciplineService.getDisciplines();
  }
}
