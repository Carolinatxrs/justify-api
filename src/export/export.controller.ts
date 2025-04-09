import { Controller, Get, Query, Res, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { ExportQuerySchema, ExportQueryDto } from './dto/export-query.dto';
import { ExportService } from './export.service';

@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('export-justifications')
  async exportJustifications(
    @Query(new ZodValidationPipe(ExportQuerySchema)) query: ExportQueryDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // 1. Geração do relatório (com opção de mock via query param)
    const { stream } = await this.exportService.generateReport({
      baseYear: query.baseYear,
      useMock: query.useMock === 'true' // Converte string para boolean
    });

    // 2. Configuração dos headers
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="RDFinanceiro_RDA_RH_${query.baseYear}.xlsx"`,
      'Cache-Control': 'no-cache'
    });

    // 3. Retorno do stream
    return new StreamableFile(stream);
  }
}