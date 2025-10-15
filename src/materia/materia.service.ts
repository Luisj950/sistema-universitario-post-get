import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { PrismaService } from '../prisma/prisma.service'; // 1. Importa PrismaService

@Injectable()
export class MateriaService {
  // 2. Inyecta PrismaService en el constructor
  constructor(private prisma: PrismaService) {}

  // 3. Implementa la lógica real para crear una materia
  create(createMateriaDto: CreateMateriaDto) {
    return this.prisma.materia.create({
      data: createMateriaDto,
    });
  }

  // 4. Implementa la lógica para encontrar todas las materias
  findAll() {
    return this.prisma.materia.findMany({
      include: {
        carrera: true, // Incluye la información de la carrera relacionada
      },
    });
  }

  // 5. Implementa la lógica para encontrar una materia por ID
  async findOne(id: number) {
    const materia = await this.prisma.materia.findUnique({
      where: { id_materia: id },
      include: {
        carrera: true,
      },
    });

    if (!materia) {
      throw new NotFoundException(`Materia con ID #${id} no encontrada`);
    }
    return materia;
  }

  // Lógica para actualizar (opcional)
  async update(id: number, updateMateriaDto: UpdateMateriaDto) {
    await this.findOne(id); // Reutiliza findOne para verificar si existe
    return this.prisma.materia.update({
      where: { id_materia: id },
      data: updateMateriaDto,
    });
  }

  // Lógica para eliminar (opcional)
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.materia.delete({
      where: { id_materia: id },
    });
  }
}