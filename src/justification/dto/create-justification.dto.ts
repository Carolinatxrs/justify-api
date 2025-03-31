import { z } from 'zod';

export const CreateJustificationSchema = z.object({
  collaboratorId: z.number().int().positive(),
  projectId: z.number().int().positive(),
  managerId: z.number().int().positive(),
  periodoId: z.number().int().positive(),
  justification: z.string().min(10, "Justificativa deve ter pelo menos 10 caracteres"),
  status: z.enum(['pendente', 'aprovado', 'rejeitado']).default('pendente'),
  startJustificationDate: z.string().datetime(),
  endJustificationDate: z.string().datetime(),
});

export type CreateJustificationDto = z.infer<typeof CreateJustificationSchema>;