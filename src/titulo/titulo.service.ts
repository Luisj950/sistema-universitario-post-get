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

  findAll() {
    // Incluimos al profesor para saber a quién pertenece cada título
    return this.prisma.titulo.findMany({
      include: {
        profesor: true,
      },
    });
  }

  async findOne(id: number) {
    const titulo = await this.prisma.titulo.findUnique({
      where: { id_titulo: id },
      include: {
        profesor: true, // Corregido para incluir 'profesor'
      },
    });

    if (!titulo) {
      throw new NotFoundException(`Título con ID #${id} no encontrado`);
    }
    return titulo;
  }

  async update(id: number, updateTituloDto: UpdateTituloDto) {
    await this.findOne(id); // Verifica si el título existe
    return this.prisma.titulo.update({
      where: { id_titulo: id },
      data: updateTituloDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica si el título existe
    return this.prisma.titulo.delete({
      where: { id_titulo: id },
    });
  }
}