import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateIncidenceDto {
  @IsNotEmpty()
  proyecto: number;

  @IsNotEmpty()
  instalacion: number;

  @IsNotEmpty()
  zona: number;

  @IsNotEmpty()
  subZona: number;

  @IsNotEmpty()
  usuarioCreador: number;

  @IsNotEmpty()
  categorias: number[];

  @IsNotEmpty()
  disciplina: number;

  @IsOptional()
  fechaIncidencia: string;

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
