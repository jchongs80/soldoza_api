import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities';
import { Repository } from 'typeorm';
import {
  updateFilename,
  uploadFileToBlobStorage,
  getFileURLFromBlobStorage,
} from './helpers';
import { IncidenceService } from 'src/incidence/incidence.service';
import { CreatePhotoDto } from './dtos';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    private readonly incidenceService: IncidenceService,
  ) {}

  // Public methods

  async addIncidentPhoto(
    dto: CreatePhotoDto,
    files: Array<Express.Multer.File>,
  ) {
    const incidenceFound = await this.incidenceService.findById(
      dto.incidenteId,
    );

    if (incidenceFound) {
      for (const photo of files) {
        photo.originalname = updateFilename(photo.originalname, '3');
        const upload = await uploadFileToBlobStorage(photo);
        if (upload) {
          const imageUrl = await getFileURLFromBlobStorage(photo);
          const photoToCreate: Photo = new Photo();
          photoToCreate.incidente = dto.incidenteId as any;
          photoToCreate.fotoUrl = imageUrl;
          photoToCreate.latitud = dto.latitud;
          photoToCreate.longitud = dto.longitud;
          photoToCreate.usuario = dto.usuario as any;

          await this.createPhoto(photoToCreate);
        }
      }
    } else {
      throw new NotFoundException('Incidencia no encontrada');
    }

    return {
      status: 201,
      message: 'Fotos guardadas',
    };
  }

  // Private methods

  private async createPhoto(entity: Photo) {
    return await this.photoRepository.save(entity);
  }
}
