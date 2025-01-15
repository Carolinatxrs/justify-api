import { z } from 'zod';

// Definindo o schema Zod diretamente
export const CreateJustificativaDto = z.object({
  collaboratorId: z.number(),
  justification: z
    .string()
    .min(100, 'Justificativa precisa ter no mínimo 100 caracteres'),
  status: z.enum(['não realizado', 'em analise', 'aprovado']),
});

// Usando a inferência do Zod para definir o tipo
export type CreateJustificativaDtoType = z.infer<typeof CreateJustificativaDto>;
