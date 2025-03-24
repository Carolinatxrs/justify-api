import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { JustificativaService } from './justificativa.service';
import { CreateJustificativaDtoType } from './dto/create-justificativa.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe'; // Pipe customizado

@Controller('justificativas')
export class JustificativaController {
  constructor(private readonly justificativaService: JustificativaService) {}

  // @Post()
  // @UsePipes(new ZodValidationPipe()) // Usando o Pipe para validação
  // async create(@Body() createJustificativaDto: CreateJustificativaDtoType) {
  //   return this.justificativaService.create(createJustificativaDto);
  // }
}
