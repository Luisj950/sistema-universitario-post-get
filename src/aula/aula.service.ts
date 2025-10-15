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

  findAll() {
    return this.prisma.aula.findMany();
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

  // --- MÉTODO MEJORADO ---
  async update(id: number, updateAulaDto: UpdateAulaDto) {
    // 1. Primero, verifica que el aula exista.
    // Si no existe, findOne() lanzará el error 404 y el código se detendrá aquí.
    await this.findOne(id);

    // 2. Si existe, procede a actualizarla.
    return this.prisma.aula.update({
      where: { id_aula: id },
      data: updateAulaDto,
    });
  }

  // --- MÉTODO MEJORADO ---
  async remove(id: number) {
    // 1. Primero, verifica que el aula exista.
    await this.findOne(id);

    // 2. Si existe, procede a eliminarla.
    return this.prisma.aula.delete({
      where: { id_aula: id },
    });
  }
}