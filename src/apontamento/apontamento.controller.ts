import { Body, Controller, Post } from '@nestjs/common';
import { ApontamentoService } from './apontamento.service';
import { CreateApontamentoDto } from './dto/create-apontamento.dto';

@Controller('apontamentos')
export class ApontamentoController {
  constructor(private readonly apontamentoService: ApontamentoService) {}

  @Post()
  create(@Body() createApontamentoDto: CreateApontamentoDto) {
    return this.apontamentoService.create(createApontamentoDto);
  }

  @Post('batch')
  createMany(@Body() apontamentos: CreateApontamentoDto[]) {
    return this.apontamentoService.createMany(apontamentos);
  }
}