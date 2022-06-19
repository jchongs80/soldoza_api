import { Module } from '@nestjs/common';
import { PlantZoneDetailService } from './plant-zone-detail.service';
import { PlantZoneDetailController } from './plant-zone-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantZoneDetail } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([PlantZoneDetail])],
  providers: [PlantZoneDetailService],
  controllers: [PlantZoneDetailController],
})
export class PlantZoneDetailModule {}
