import { Module } from '@nestjs/common';
import { JustificativaService } from './justificativa.service';
import { JustificativaController } from './justificativa.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [JustificativaController],
  providers: [JustificativaService, PrismaService],
})
export class JustificativaModule {}
