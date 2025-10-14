// src/estudiante/estudiante.service.ts

import { Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { PrismaService } from '../prisma/prisma.service'; // <-- Ruta corregida

@Injectable()
export class EstudianteService {
  // Inyecta el servicio en el constructor
  constructor(private prisma: PrismaService) {}

  create(createEstudianteDto: CreateEstudianteDto) {
    // Map DTO to Prisma input
    const data = {
     
      ...createEstudianteDto
    };
    return this.prisma.estudiante.create({
      data,
    });
  }

  findAll() {
    return this.prisma.estudiante.findMany();
  }

  findOne(id: number) {
    return this.prisma.estudiante.findUnique({ where: { id_estudiante: id } });
  }

  update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    return this.prisma.estudiante.update({
      where: { id_estudiante: id },
      data: updateEstudianteDto,
    });
  }

  remove(id: number) {
    return this.prisma.estudiante.delete({ where: { id_estudiante: id } });
  }
}