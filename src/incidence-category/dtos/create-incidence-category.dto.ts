import { IsNotEmpty } from 'class-validator';

export class CreateIncidenceCategoryDto {
  @IsNotEmpty()
  incidente: number;

  @IsNotEmpty()
  categoria: number;
}
