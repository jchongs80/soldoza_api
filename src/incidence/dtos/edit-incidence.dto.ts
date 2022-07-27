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

  @IsOptional()
  usuarioRejected: number;

  @IsOptional()
  usuarioReceived: number;

  @IsOptional()
  usuarioCommented: number;

  @IsOptional()
  usuarioCorrected: number;

  @IsOptional()
  usuarioClosed: number;

  @IsOptional()
  usuarioApproved: number;

  @IsOptional()
  fechaRejected: string;

  @IsOptional()
  fechaReceived: string;

  @IsOptional()
  fechaCommented: string;

  @IsOptional()
  fechaCorrected: string;

  @IsOptional()
  fechaClosed: string;

  @IsOptional()
  fechaApproved: string;
}
