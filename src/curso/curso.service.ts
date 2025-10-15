import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CursoService {
  constructor(private prisma: PrismaService) {}

  create(createCursoDto: CreateCursoDto) {
    return this.prisma.curso.create({
      data: createCursoDto,
    });
  }

  // --- MÉTODO findAll CORREGIDO Y UNIFICADO CON PAGINACIÓN ---
  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.prisma.curso.findMany({ // Corregido para buscar en 'curso'
      skip: skip,
      take: limit,
      include: { // Mantenemos los includes para dar más contexto
        materia: true,
        profesor: true,
        aula: true,
      },
    });
  }

  async findOne(id: number) {
    const curso = await this.prisma.curso.findUnique({
      where: { id_curso: id },
      include: {
        materia: true,
        profesor: true,
        aula: true,
      },
    });

    if (!curso) {
      throw new NotFoundException(`Curso con ID #${id} no encontrado`);
    }
    return curso;
  }

  async update(id: number, updateCursoDto: UpdateCursoDto) {
    await this.findOne(id); // Verifica si existe
    return this.prisma.curso.update({
      where: { id_curso: id },
      data: updateCursoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica si existe
    return this.prisma.curso.delete({
      where: { id_curso: id },
    });
  }
}