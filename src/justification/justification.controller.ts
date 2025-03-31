import { Controller, Post, Body, HttpCode, HttpStatus, UsePipes } from '@nestjs/common';
import { JustificationService } from './justification.service';
import { CreateJustificationDto, CreateJustificationSchema } from './dto/create-justification.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Justificativas')
@Controller('justifications')
export class JustificationController {
  constructor(private readonly justificationService: JustificationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(CreateJustificationSchema))
  @ApiResponse({
    status: 201,
    description: 'Justificativa criada com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Colaborador, projeto ou gestor não encontrado' })
  async create(@Body() createJustificationDto: CreateJustificationDto) {
    return this.justificationService.create(createJustificationDto);
  }
}