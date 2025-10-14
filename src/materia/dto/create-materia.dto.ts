import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateMateriaDto {
  @IsString()
  @IsNotEmpty()
  nombre_materia: string;

  @IsString()
  @IsNotEmpty()
  codigo_materia: string;

  @IsInt() // Es importante validar que sea un número entero
  @IsNotEmpty()
  id_carrera: number; // El ID de la carrera a la que pertenece
}