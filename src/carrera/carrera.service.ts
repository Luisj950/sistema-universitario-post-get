import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CarreraService {
  constructor(private prisma: PrismaService) {}

  create(createCarreraDto: CreateCarreraDto) {
    return this.prisma.carrera.create({
      data: createCarreraDto,
    });
  }

  // --- MÉTODO findAll CORREGIDO CON PAGINACIÓN ---
  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.prisma.carrera.findMany({ 
      skip: skip,
      take: limit,
    });
  }

  
  async findOne(id: number) {
    const carrera = await this.prisma.carrera.findUnique({
      where: { id_carrera: id },
    });

    if (!carrera) {
      throw new NotFoundException(`Carrera con ID #${id} no encontrada`);
    }
    return carrera;
  }


  async update(id: number, updateCarreraDto: UpdateCarreraDto) {
    await this.findOne(id); 
    return this.prisma.carrera.update({
      where: { id_carrera: id },
      data: updateCarreraDto,
    });
  }

 
  async remove(id: number) {
    await this.findOne(id); 
    return this.prisma.carrera.delete({
      where: { id_carrera: id },
    });
  }
}