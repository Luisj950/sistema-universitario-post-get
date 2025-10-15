import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe, // <-- La pieza que faltaba
} from '@nestjs/common';
import { AulaService } from './aula.service';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';

@Controller('aulas')
export class AulaController {
  constructor(private readonly aulaService: AulaService) {}

  @Post()
  create(@Body() createAulaDto: CreateAulaDto) {
    return this.aulaService.create(createAulaDto);
  }

  @Get()
  findAll() {
    return this.aulaService.findAll();
  }

  // --- CORREGIDO ---
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    // Ahora 'id' ya es un número y está validado.
    return this.aulaService.findOne(id);
  }

  // --- CORREGIDO ---
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAulaDto: UpdateAulaDto,
  ) {
    return this.aulaService.update(id, updateAulaDto);
  }

  // --- CORREGIDO ---
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.aulaService.remove(id);
  }
}