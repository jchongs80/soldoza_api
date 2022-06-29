import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserType } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserType])],
})
export class UserTypeModule {}
