import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAulaDto {
  @IsString()
  @IsNotEmpty()
  numero_aula: string;

  @IsString()
  @IsOptional() // El edificio es opcional, como en tu schema
  edificio?: string;
}