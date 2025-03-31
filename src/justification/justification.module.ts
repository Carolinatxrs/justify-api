import { Module } from '@nestjs/common';
import { JustificationService } from './justification.service';
import { JustificationController } from './justification.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [JustificationController],
  providers: [JustificationService, PrismaService],
})
export class JustificationModule {}
