import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { AuthModule } from './Auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Hace las variables de entorno (.env) disponibles globalmente
    PrismaModule,
    EstudiantesModule,
    AuthModule, // Importa el módulo de autenticación para que la app lo reconozca
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
