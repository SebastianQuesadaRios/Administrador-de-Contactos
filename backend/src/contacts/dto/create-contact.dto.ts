import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser texto' })
  @Length(2, 50, { message: 'El nombre debe tener entre 2 y 50 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'El email debe ser válido' })
  email: string;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser texto' })
  @Length(10, 15, { message: 'El teléfono debe tener entre 10 y 15 caracteres' })
  phone?: string;
}
