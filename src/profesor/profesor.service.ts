import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { PrismaService } from '../prisma/prisma.service'; // 1. Importa PrismaService

@Injectable()
export class ProfesorService {
  // 2. Inyecta PrismaService en el constructor
  constructor(private prisma: PrismaService) {}

  // 3. Implementa la lógica real para cada método
  create(createProfesorDto: CreateProfesorDto) {
    return this.prisma.profesor.create({
      data: createProfesorDto,
    });
  }

  findAll() {
    return this.prisma.profesor.findMany();
  }

  async findOne(id: number) {
    const profesor = await this.prisma.profesor.findUnique({
      where: { id_profesor: id }, // Asegúrate de que 'id_profesor' sea tu clave primaria
    });

    if (!profesor) {
      throw new NotFoundException(`Profesor con ID #${id} no encontrado`);
    }
    return profesor;
  }

  async update(id: number, updateProfesorDto: UpdateProfesorDto) {
    // Primero, verifica que el profesor exista
    await this.findOne(id);
    return this.prisma.profesor.update({
      where: { id_profesor: id },
      data: updateProfesorDto,
    });
  }

  async remove(id: number) {
    // Primero, verifica que el profesor exista
    await this.findOne(id);
    return this.prisma.profesor.delete({
      where: { id_profesor: id },
    });
  }
}
