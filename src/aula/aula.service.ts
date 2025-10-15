import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AulaService {
  constructor(private prisma: PrismaService) {}

  create(createAulaDto: CreateAulaDto) {
    return this.prisma.aula.create({
      data: createAulaDto,
    });
  }

  // --- MÉTODO findAll CORREGIDO CON PAGINACIÓN ---
  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    // Corregido para buscar en 'aula' en lugar de 'carrera'
    return this.prisma.aula.findMany({ 
      skip: skip,
      take: limit,
    });
  }

  async findOne(id: number) {
    const aula = await this.prisma.aula.findUnique({
      where: { id_aula: id },
    });
    if (!aula) {
      throw new NotFoundException(`El aula con el ID #${id} no fue encontrada`);
    }
    return aula;
  }

  async update(id: number, updateAulaDto: UpdateAulaDto) {
    await this.findOne(id);
    return this.prisma.aula.update({
      where: { id_aula: id },
      data: updateAulaDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.aula.delete({
      where: { id_aula: id },
    });
  }
}