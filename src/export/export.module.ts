// src/export/export.module.ts
import { Module } from '@nestjs/common';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Importa o módulo do Prisma
  controllers: [ExportController],
  providers: [ExportService],
})
export class ExportModule {}