import { z } from 'zod';

export const ExportQuerySchema = z.object({
  baseYear: z.string().regex(/^\d{4}$/, 'Ano base deve estar no formato YYYY'),
  projects: z.string().optional().transform(val => 
    val ? val.split(',') : undefined
  ),
  subprojects: z.string().optional().transform(val => 
    val ? val.split(',') : undefined
  ),
  areas: z.string().optional().transform(val => 
    val ? val.split(',') : undefined
  ),
});

export type ExportQueryDto = z.infer<typeof ExportQuerySchema>;