import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EstudianteService {
  constructor(private prisma: PrismaService) {}

  create(createEstudianteDto: CreateEstudianteDto) {
    return this.prisma.estudiante.create({
      data: createEstudianteDto,
    });
  }

  // --- MÉTODO findAll CORREGIDO CON PAGINACIÓN ---
  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.prisma.estudiante.findMany({
      skip: skip,
      take: limit,
    });
  }


  async findOne(id: number) {
    const estudiante = await this.prisma.estudiante.findUnique({
      where: { id_estudiante: id },
    });

    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID #${id} no encontrado`);
    }
    return estudiante;
  }

 
  async update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    await this.findOne(id); 
    return this.prisma.estudiante.update({
      where: { id_estudiante: id },
      data: updateEstudianteDto,
    });
  }

  
  async remove(id: number) {
    await this.findOne(id); 
    return this.prisma.estudiante.delete({
      where: { id_estudiante: id },
    });
  }
}