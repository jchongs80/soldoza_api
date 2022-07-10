import { IsOptional } from 'class-validator';

export class EditIncidenceDto {
  @IsOptional()
  descripcionIncidencia: string;

  @IsOptional()
  accionRequerida: string;

  @IsOptional()
  fechaLimite: string;

  @IsOptional()
  esNoConformidad: boolean;

  @IsOptional()
  codigoNC: string;

  @IsOptional()
  comentarioReceptor: string;

  @IsOptional()
  estado: number;

  @IsOptional()
  resultadoReceptor: string;
}
