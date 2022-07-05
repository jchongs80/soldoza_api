import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  nombreUsuario: string;

  @IsString()
  @IsOptional()
  apellidosUsuario: string;

  @IsEmail()
  @IsOptional()
  emailUsuario: string;

  @IsString()
  @IsOptional()
  passwordUsuario: string;

  @IsString()
  @IsOptional()
  fotoUsuario: string;

  @IsString()
  @IsOptional()
  firmaUsuario: string;

  @IsString()
  @IsOptional()
  token: string;
}
