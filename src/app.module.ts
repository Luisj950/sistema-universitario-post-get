import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { CarreraModule } from './carrera/carrera.module';
import { ProfesorModule } from './profesor/profesor.module';
import { TituloModule } from './titulo/titulo.module';
import { AulaModule } from './aula/aula.module';
import { MateriaModule } from './materia/materia.module';
import { CursoModule } from './curso/curso.module';
import { InscripcionModule } from './inscripcion/inscripcion.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [EstudianteModule, CarreraModule, ProfesorModule, TituloModule, AulaModule, MateriaModule, CursoModule, InscripcionModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
