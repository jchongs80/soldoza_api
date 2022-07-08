import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantUser } from './entities';
import { PlantUserService } from './plant-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlantUser])],
  providers: [PlantUserService],
  exports: [PlantUserService],
})
export class PlantUserModule {}
