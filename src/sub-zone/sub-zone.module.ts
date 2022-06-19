import { Module } from '@nestjs/common';
import { SubZoneService } from './sub-zone.service';
import { SubZoneController } from './sub-zone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubZone } from './entities/sub-zone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubZone])],
  providers: [SubZoneService],
  controllers: [SubZoneController],
})
export class SubZoneModule {}
