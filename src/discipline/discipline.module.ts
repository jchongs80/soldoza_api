import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discipline } from './entities/discipline.entity';
import { DisciplineService } from './discipline.service';
import { DisciplineController } from './discipline.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Discipline])],
  providers: [DisciplineService],
  controllers: [DisciplineController],
})
export class DisciplineModule {}
