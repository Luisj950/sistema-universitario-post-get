import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfesorService {
  constructor(private prisma: PrismaService) {}

  create(createProfesorDto: CreateProfesorDto) {
    return this.prisma.profesor.create({
      data: createProfesorDto,
    });
  }

  // --- MÉTODO findAll CORREGIDO CON PAGINACIÓN ---
  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.prisma.profesor.findMany({
      skip: skip,
      take: limit,
    });
  }

  async findOne(id: number) {
    const profesor = await this.prisma.profesor.findUnique({
      where: { id_profesor: id },
    });

    if (!profesor) {
      throw new NotFoundException(`Profesor con ID #${id} no encontrado`);
    }
    return profesor;
  }

  async update(id: number, updateProfesorDto: UpdateProfesorDto) {
    await this.findOne(id);
    return this.prisma.profesor.update({
      where: { id_profesor: id },
      data: updateProfesorDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.profesor.delete({
      where: { id_profesor: id },
    });
  }
}