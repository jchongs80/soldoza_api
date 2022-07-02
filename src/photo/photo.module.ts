import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidenceModule } from 'src/incidence/incidence.module';
import { Photo } from './entities/photo.entity';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo]),
    forwardRef(() => IncidenceModule),
  ],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
