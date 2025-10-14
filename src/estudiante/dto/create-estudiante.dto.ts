// src/estudiante/dto/create-estudiante.dto.ts

// Para validaciones automáticas (opcional pero muy recomendado)
// Si no los tienes, instálalos: npm install class-validator class-transformer
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEstudianteDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsEmail()
  email: string;
}