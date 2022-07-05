import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectUser } from './entities';
import { ProjectUserController } from './project-user.controller';
import { ProjectUserService } from './project-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectUser])],
  controllers: [ProjectUserController],
  providers: [ProjectUserService],
  exports: [ProjectUserService]
})
export class ProjectUserModule {}
