import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateTituloDto {
  @IsString()
  @IsNotEmpty()
  nombre_titulo: string;

  @IsInt()
  @IsNotEmpty()
  id_profesor: number; // El ID del profesor al que pertenece el título
}