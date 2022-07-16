import { forwardRef, Module } from '@nestjs/common';
import { IncidenceService } from './incidence.service';
import { IncidenceController } from './incidence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incidence } from './entities';
import { IncidenceCategoryModule } from 'src/incidence-category/incidence-category.module';
import { PlantModule } from 'src/plant/plant.module';
import { ProjectUserModule } from 'src/project-user/project-user.module';
import { UserModule } from 'src/user/user.module';
import { PlantUserModule } from 'src/plant-user/plant-user.module';
import { UserDisciplineModule } from 'src/user-discipline/user-discipline.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Incidence]),
    forwardRef(() => IncidenceCategoryModule),
    forwardRef(() => PlantModule),
    forwardRef(() => ProjectUserModule),
    forwardRef(() => UserModule),
    forwardRef(() => PlantUserModule),
    forwardRef(() => UserDisciplineModule),
  ],
  providers: [IncidenceService],
  controllers: [IncidenceController],
  exports: [IncidenceService],
})
export class IncidenceModule {}
