import { Module } from '@nestjs/common';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { ManagerModule } from './manager/manager.module';
import { ProjectModule } from './project/project.module';
import { PrismaService } from './prisma.service';
import { ApontamentoModule } from './apontamento/apontamento.module';
import { PeriodoModule } from './periodo/periodo.module';
import { JustificationModule } from './justification/justification.module';

@Module({
  imports: [CollaboratorModule, ManagerModule, ProjectModule, ApontamentoModule, PeriodoModule, JustificationModule],
  providers: [PrismaService],
})
export class AppModule {}
