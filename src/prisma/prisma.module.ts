// src/prisma/prisma.module.ts

import { Global, Module } from '@nestjs/common'; // <-- Importa Global
import { PrismaService } from './prisma.service';

@Global() // <-- Añade este decorador
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}