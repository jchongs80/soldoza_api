import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { PlantModule } from './plant/plant.module';
import { PlantZoneDetailModule } from './plant-zone-detail/plant-zone-detail.module';
import { ZoneModule } from './zone/zone.module';
import { SubZoneModule } from './sub-zone/sub-zone.module';
import { IncidenceModule } from './incidence/incidence.module';
import { CustomerModule } from './customer/customer.module';
import { ProjectUserModule } from './project-user/project-user.module';
import { UserTypeModule } from './user-type/user-type.module';
import { CategoryModule } from './category/category.module';
import { DisciplineModule } from './discipline/discipline.module';
import { IncidenceCategoryModule } from './incidence-category/incidence-category.module';
import { IncidenceStateModule } from './incidence-state/incidence-state.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + './**/**/*entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false,
    }),
    RoleModule,
    UserModule,
    AuthModule,
    ProjectModule,
    PlantModule,
    PlantZoneDetailModule,
    ZoneModule,
    SubZoneModule,
    IncidenceModule,
    CustomerModule,
    ProjectUserModule,
    UserTypeModule,
    CategoryModule,
    DisciplineModule,
    IncidenceCategoryModule,
    IncidenceStateModule,
    PhotoModule,
  ],
})
export class AppModule {}
