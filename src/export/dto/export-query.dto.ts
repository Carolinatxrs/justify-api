import { z } from 'zod';

export const ExportQuerySchema = z.object({
  baseYear: z.string().regex(/^\d{4}$/, 'Ano base deve estar no formato YYYY'),
  useMock: z.string().optional() // 'true' ou 'false' como string
});

export type ExportQueryDto = z.infer<typeof ExportQuerySchema>;