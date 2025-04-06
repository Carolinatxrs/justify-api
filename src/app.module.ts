import { Module } from '@nestjs/common';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { ManagerModule } from './manager/manager.module';
import { ProjectModule } from './project/project.module';
import { PrismaService } from './prisma.service';
import { ApontamentoModule } from './apontamento/apontamento.module';
import { PeriodoModule } from './periodo/periodo.module';
import { JustificationModule } from './justification/justification.module';
import { ExportController } from './export/export.controller';
import { ExportModule } from './export/export.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CollaboratorModule, ManagerModule, ProjectModule, ApontamentoModule, PeriodoModule, JustificationModule, ExportModule, PrismaModule],
  providers: [PrismaService],
  // controllers: [ExportController],
})
export class AppModule {}
