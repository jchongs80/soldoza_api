import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nombreUsuario: string;

  @IsString()
  apellidosUsuario: string;

  @IsEmail()
  emailUsuario: string;

  @IsString()
  passwordUsuario: string;

  @IsString()
  @IsOptional()
  fotoUsuario: string;

  @IsString()
  @IsOptional()
  firmaUsuario: string;
}
