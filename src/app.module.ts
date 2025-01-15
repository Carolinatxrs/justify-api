import { Module } from '@nestjs/common';
import { JustificativaModule } from './justificativa/justificativa.module';

@Module({
  imports: [JustificativaModule],
})
export class AppModule {}
