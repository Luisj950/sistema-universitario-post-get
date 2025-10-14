import { Injectable, OnModuleInit } from '@nestjs/common';
// 👇 AQUÍ ESTÁ LA IMPORTACIÓN
import { PrismaClient } from '@prisma/client';

@Injectable()
// 👇 AQUÍ SE "CREA LA INSTANCIA" AL EXTENDER LA CLASE
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
      await this.$connect();
    }
  }