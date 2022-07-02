import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreatePhotoDto } from './dtos';
import { PhotoService } from './photo.service';

@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post('upload-to-incident')
  @UseInterceptors(FilesInterceptor('files'))
  async addIncidentPhotos(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() dto: CreatePhotoDto,
  ) {
    const data = await this.photoService.addIncidentPhoto(dto, files);
    return data;
  }
}
