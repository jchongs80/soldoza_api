import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantUser } from './entities';
import { PlantUserService } from './plant-user.service';
import { PlantUserController } from './plant-user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlantUser])],
  providers: [PlantUserService],
  exports: [PlantUserService],
  controllers: [PlantUserController],
})
export class PlantUserModule {}
