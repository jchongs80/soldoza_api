import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidenceCategory } from './entities';
import { IncidenceCategoryService } from './incidence-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([IncidenceCategory])],
  providers: [IncidenceCategoryService],
  exports: [IncidenceCategoryService],
})
export class IncidenceCategoryModule {}
