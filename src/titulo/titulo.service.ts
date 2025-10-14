import { Injectable } from '@nestjs/common';
import { CreateTituloDto } from './dto/create-titulo.dto';
import { UpdateTituloDto } from './dto/update-titulo.dto';

@Injectable()
export class TituloService {
  create(createTituloDto: CreateTituloDto) {
    return 'This action adds a new titulo';
  }

  findAll() {
    return `This action returns all titulo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} titulo`;
  }

  update(id: number, updateTituloDto: UpdateTituloDto) {
    return `This action updates a #${id} titulo`;
  }

  remove(id: number) {
    return `This action removes a #${id} titulo`;
  }
}
