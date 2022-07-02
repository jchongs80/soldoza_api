import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plant } from './entities';
import { PlantService } from './plant.service';
import { PlantController } from './plant.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Plant])],
  providers: [PlantService],
  controllers: [PlantController],
  exports: [PlantService]
})
export class PlantModule {}
