import { Module } from '@nestjs/common';
import { ApontamentoService } from './apontamento.service';
import { ApontamentoController } from './apontamento.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ApontamentoController],
  providers: [ApontamentoService, PrismaService],
})
export class ApontamentoModule {}
