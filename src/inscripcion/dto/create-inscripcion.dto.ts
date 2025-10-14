import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateInscripcionDto {
  @IsInt()
  @IsNotEmpty()
  id_estudiante: number;

  @IsInt()
  @IsNotEmpty()
  id_curso: number;
}