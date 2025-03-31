import { Controller, Get, Query, Res, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { ExportQuerySchema, ExportQueryDto } from './dto/export-query.dto';
import { ExportService } from './export.service';

@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('justifications')
  async exportJustifications(
    @Query(new ZodValidationPipe(ExportQuerySchema)) query: ExportQueryDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { stream, hasPendingJustifications } = await this.exportService.generateReport({
      baseYear: query.baseYear,
      projects: query.projects,
      subprojects: query.subprojects,
      areas: query.areas
    });
    
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="RDFinanceiro_RDA_RH_${query.baseYear}.xlsx"`,
    });

    if (hasPendingJustifications) {
      res.setHeader('X-Justification-Status', 'pending');
    }

    return new StreamableFile(stream);
  }
}