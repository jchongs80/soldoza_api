import { IsOptional } from 'class-validator';

export class IncidenceQueryDto {
  @IsOptional()
  proyectoId: number;

  @IsOptional()
  instalacionId: number;

  @IsOptional()
  zonaId: number;

  @IsOptional()
  subZonaId: number;

  @IsOptional()
  usuarioCreadorId:number;
}
