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

  
  findAll() {
    return this.prisma.carrera.findMany();
  }

  
  findOne(id: number) {
    return this.prisma.carrera.findUnique({
      where: { id_carrera: id },
    });
  }

  
  update(id: number, updateCarreraDto: UpdateCarreraDto) {
    return this.prisma.carrera.update({
      where: { id_carrera: id },
      data: updateCarreraDto,
    });
  }

 
  remove(id: number) {
    return this.prisma.carrera.delete({
      where: { id_carrera: id },
    });
  }
}