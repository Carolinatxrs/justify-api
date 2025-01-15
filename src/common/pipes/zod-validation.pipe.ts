import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  transform(value: any, metadata: any) {
    const { metatype } = metadata;

    // Verifica se o metatype é um objeto Zod
    if (metatype && metatype._def?.typeName === 'ZodObject') {
      try {
        // Valida os dados usando o Zod
        metatype.parse(value);
        return value;
      } catch (error) {
        if (error instanceof ZodError) {
          // Aqui, processamos as mensagens de erro de validação
          const errorMessages = error.errors.map(
            (err) => `${err.path.join('.')} - ${err.message}`,
          );
          throw new BadRequestException(errorMessages);
        }
        // Se for outro tipo de erro, lança normalmente
        throw error;
      }
    }
    return value;
  }
}
