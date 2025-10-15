import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MateriaService {
  constructor(private prisma: PrismaService) {}

  create(createMateriaDto: CreateMateriaDto) {
    return this.prisma.materia.create({
      data: createMateriaDto,
    });
  }

  // --- MÉTODO findAll CORREGIDO CON PAGINACIÓN ---
  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.prisma.materia.findMany({
      skip: skip,
      take: limit,
      include: {
        carrera: true, 
      },
    });
  }

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

  async update(id: number, updateMateriaDto: UpdateMateriaDto) {
    await this.findOne(id);
    return this.prisma.materia.update({
      where: { id_materia: id },
      data: updateMateriaDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.materia.delete({
      where: { id_materia: id },
    });
  }
}