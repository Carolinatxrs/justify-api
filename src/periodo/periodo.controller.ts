import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { PeriodoJustificativaService } from './periodo.service';
import { CreatePeriodoJustificativaDto } from './dto/create-periodo.dto';

@ApiTags('Períodos de Justificativa')
@Controller('periodos-justificativa')
export class PeriodoJustificativaController {
  constructor(
    private readonly periodoJustificativaService: PeriodoJustificativaService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 201,
    description: 'Período de justificativa criado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() createPeriodoJustificativaDto: CreatePeriodoJustificativaDto) {
    return this.periodoJustificativaService.create(createPeriodoJustificativaDto);
  }

  @Post('batch')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 201,
    description: 'Períodos de justificativa criados em massa com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async createMany(@Body() periodos: CreatePeriodoJustificativaDto[]) {
    return this.periodoJustificativaService.createMany(periodos);
  }
}