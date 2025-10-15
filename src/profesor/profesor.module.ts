import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { PrismaModule } from '../prisma/prisma.module'; 

@Module({
  imports: [PrismaModule], // <-- 2. Añádelo a los imports
  controllers: [ProfesorController],
  providers: [ProfesorService],
})
export class ProfesorModule {}