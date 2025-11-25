// src/estudiantes/estudiantes.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEstudianteDto } from './create-estudiante.dto';
import { UpdateEstudianteDto } from './update-estudiante.dto';

@Injectable()
export class EstudiantesService {
  // Inyectamos nuestro PrismaService para poder usarlo
  constructor(private prisma: PrismaService) {}

  create(createEstudianteDto: CreateEstudianteDto) {
    return this.prisma.estudiante.create({ data: createEstudianteDto });
  }

  findAll() {
    return this.prisma.estudiante.findMany();
  }

  findOne(id: string) {
    return this.prisma.estudiante.findUnique({ where: { id } });
  }

  update(id: string, updateEstudianteDto: UpdateEstudianteDto) {
    return this.prisma.estudiante.update({
      where: { id },
      data: updateEstudianteDto,
    });
  }

  remove(id: string) {
    return this.prisma.estudiante.delete({ where: { id } });
  }
}