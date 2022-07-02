import { forwardRef, Module } from '@nestjs/common';
import { IncidenceService } from './incidence.service';
import { IncidenceController } from './incidence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incidence } from './entities';
import { IncidenceCategoryModule } from 'src/incidence-category/incidence-category.module';
import { PlantModule } from 'src/plant/plant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Incidence]),
    forwardRef(() => IncidenceCategoryModule),
    forwardRef(() => PlantModule),
  ],
  providers: [IncidenceService],
  controllers: [IncidenceController],
})
export class IncidenceModule {}
