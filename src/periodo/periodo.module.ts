import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PeriodoJustificativaService } from './periodo.service';
import { PeriodoJustificativaController } from './periodo.controller';

@Module({
  controllers: [PeriodoJustificativaController],
  providers: [PeriodoJustificativaService, PrismaService],
})
export class PeriodoModule {}
