// src/prisma/prisma.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Isso é crucial para permitir injeção em outros módulos
})
export class PrismaModule {}