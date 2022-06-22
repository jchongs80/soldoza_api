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
  ],
})
export class AppModule {}
