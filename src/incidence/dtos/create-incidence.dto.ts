import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateIncidenceDto {
  @IsNotEmpty()
  proyecto: number;

  @IsNotEmpty()
  instalacion: number;

  @IsNotEmpty()
  zona: number;

  @IsNotEmpty()
  subZona: number;
}
