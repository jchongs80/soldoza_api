import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDiscipline } from './entities';
import { UserDisciplineService } from './user-discipline.service';
import { UserDisciplineController } from './user-discipline.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserDiscipline])],
  providers: [UserDisciplineService],
  controllers: [UserDisciplineController],
  exports: [UserDisciplineService],
})
export class UserDisciplineModule {}
