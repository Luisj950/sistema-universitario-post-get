import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  @IsOptional()
  semestre?: string;

  @IsInt()
  @IsOptional()
  anio?: number;

  @IsInt()
  @IsNotEmpty()
  id_materia: number;

  @IsInt()
  @IsNotEmpty()
  id_profesor: number;

  @IsInt()
  @IsNotEmpty()
  id_aula: number;
}