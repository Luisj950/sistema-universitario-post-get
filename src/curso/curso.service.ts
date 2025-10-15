import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PrismaService } from '../prisma/prisma.service'; // 1. Import PrismaService

@Injectable()
export class CursoService {
  // 2. Inyecta PrismaService en el constructor
  constructor(private prisma: PrismaService) {}

  // 3. Implementa la lógica real para crear un curso
  create(createCursoDto: CreateCursoDto) {
    return this.prisma.curso.create({
      data: createCursoDto,
    });
  }

  // 4. Implementa la lógica para encontrar todos los cursos
  findAll() {
    return this.prisma.curso.findMany({
      include: {
        materia: true,
        profesor: true,
        aula: true,
      },
    });
  }

  // 5. Implementa la lógica para encontrar un curso por ID
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

  // (Opcional) Lógica para actualizar
  async update(id: number, updateCursoDto: UpdateCursoDto) {
    await this.findOne(id); // Reutiliza findOne para verificar si existe
    return this.prisma.curso.update({
      where: { id_curso: id },
      data: updateCursoDto,
    });
  }

  // (Opcional) Lógica para eliminar
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.curso.delete({
      where: { id_curso: id },
    });
  }
}