import { Module } from '@nestjs/common';
import { JustificativaModule } from './justificativa/justificativa.module';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { ManagerModule } from './manager/manager.module';
import { ProjectModule } from './project/project.module';
import { PrismaService } from './prisma.service';
import { ApontamentoModule } from './apontamento/apontamento.module';
import { PeriodoModule } from './periodo/periodo.module';

@Module({
  imports: [JustificativaModule, CollaboratorModule, ManagerModule, ProjectModule, ApontamentoModule, PeriodoModule],
  providers: [PrismaService],
})
export class AppModule {}
