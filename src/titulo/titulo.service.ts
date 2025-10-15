import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTituloDto } from './dto/create-titulo.dto';
import { UpdateTituloDto } from './dto/update-titulo.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TituloService {
  constructor(private prisma: PrismaService) {}

  create(createTituloDto: CreateTituloDto) {
    return this.prisma.titulo.create({
      data: createTituloDto,
    });
  }

  // --- MÉTODO findAll CORREGIDO CON PAGINACIÓN ---
  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.prisma.titulo.findMany({
      skip: skip,
      take: limit,
      include: {
        profesor: true, 
      },
    });
  }

  async findOne(id: number) {
    const titulo = await this.prisma.titulo.findUnique({
      where: { id_titulo: id },
      include: {
        profesor: true,
      },
    });

    if (!titulo) {
      throw new NotFoundException(`Título con ID #${id} no encontrado`);
    }
    return titulo;
  }

  async update(id: number, updateTituloDto: UpdateTituloDto) {
    await this.findOne(id);
    return this.prisma.titulo.update({
      where: { id_titulo: id },
      data: updateTituloDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.titulo.delete({
      where: { id_titulo: id },
    });
  }
}