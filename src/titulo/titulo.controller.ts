import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TituloService } from './titulo.service';
import { CreateTituloDto } from './dto/create-titulo.dto';
import { UpdateTituloDto } from './dto/update-titulo.dto';

@Controller('titulo')
export class TituloController {
  constructor(private readonly tituloService: TituloService) {}

  @Post()
  create(@Body() createTituloDto: CreateTituloDto) {
    return this.tituloService.create(createTituloDto);
  }

  @Get()
  findAll() {
    return this.tituloService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tituloService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTituloDto: UpdateTituloDto) {
    return this.tituloService.update(+id, updateTituloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tituloService.remove(+id);
  }
}
