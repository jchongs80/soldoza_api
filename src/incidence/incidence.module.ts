import { Module } from '@nestjs/common';
import { IncidenceService } from './incidence.service';
import { IncidenceController } from './incidence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incidence } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Incidence])],
  providers: [IncidenceService],
  controllers: [IncidenceController],
})
export class IncidenceModule {}
