import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InscripcionService {
  constructor(private prisma: PrismaService) {}

  create(createInscripcionDto: CreateInscripcionDto) {
    return this.prisma.inscripcion.create({
      data: createInscripcionDto,
    });
  }

  // --- MÉTODO findAll CORREGIDO CON PAGINACIÓN ---
  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.prisma.inscripcion.findMany({
      skip: skip,
      take: limit,
      include: {
        estudiante: true,
        curso: true,
      },
    });
  }

  async findOne(id: number) {
    const inscripcion = await this.prisma.inscripcion.findUnique({
      where: { id_inscripcion: id },
      include: {
        estudiante: true,
        curso: true,
      },
    });

    if (!inscripcion) {
      throw new NotFoundException(`Inscripción con ID #${id} no encontrada`);
    }
    return inscripcion;
  }

  async update(id: number, updateInscripcionDto: UpdateInscripcionDto) {
    await this.findOne(id);
    return this.prisma.inscripcion.update({
      where: { id_inscripcion: id },
      data: updateInscripcionDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.inscripcion.delete({
      where: { id_inscripcion: id },
    });
  }
}