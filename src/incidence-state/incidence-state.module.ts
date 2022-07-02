import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { IncidenceState } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([IncidenceState])],
})
export class IncidenceStateModule {}
