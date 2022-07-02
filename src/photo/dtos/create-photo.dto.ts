import { IsNotEmpty } from 'class-validator';

export class CreatePhotoDto {
  @IsNotEmpty()
  incidenteId: number;

  @IsNotEmpty()
  latitud: string;

  @IsNotEmpty()
  longitud: string;

  @IsNotEmpty()
  usuario: number;
}
