import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { DateTime } from 'luxon';
import { PassThrough } from 'stream';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ExportService {
  constructor(private prisma: PrismaService) {}

  async generateReport(params: {
    baseYear: string;
    projects?: string[];
    subprojects?: string[];
    areas?: string[];
  }) {
    // 1. Configuração inicial
    const startDate = new Date(`${params.baseYear}-01-01`);
    const endDate = new Date(`${params.baseYear}-12-31`);

    // 2. Cria o stream de saída primeiro
    const passThrough = new PassThrough();

    // 3. Configura o workbook com o stream
    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
      stream: passThrough,
      useStyles: true,
      filename: `RDFinanceiro_RDA_RH_${params.baseYear}.xlsx`
    });

    const worksheet = workbook.addWorksheet('Justificativas');

    // 4. Define estilos com tipos corretos
    const headerStyle: Partial<ExcelJS.Style> = {
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFC300' }
      },
      font: {
        name: 'Calibri',
        size: 11,
        bold: true,
        color: { argb: '000000' }
      },
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
    };

    const bodyStyle: Partial<ExcelJS.Style> = {
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'D4D4D4' }
      },
      font: {
        name: 'Calibri',
        size: 11,
        color: { argb: '000000' }
      },
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
    };

    // 5. Configura colunas
    worksheet.columns = [
      { header: 'Activity', key: 'activity', width: 30, style: headerStyle },
      { header: 'Employee Name', key: 'employeeName', width: 25, style: headerStyle },
      { header: 'CNPJ/CPF', key: 'cpf', width: 15, style: headerStyle },
      { header: 'Hire Date', key: 'hireDate', width: 15, style: headerStyle },
      { header: 'Dismissal Date', key: 'dismissalDate', width: 15, style: headerStyle },
      { header: 'Job Title', key: 'jobTitle', width: 20, style: headerStyle },
      { header: 'Degree Level', key: 'degreeLevel', width: 20, style: headerStyle },
      { header: 'Justification', key: 'justification', width: 40, style: bodyStyle },
      { header: 'Monthly Project Worktime', key: 'worktime', width: 20, style: bodyStyle },
      { header: 'Check', key: 'check', width: 15, style: bodyStyle },
      { header: 'Comment', key: 'comment', width: 30, style: bodyStyle }
    ];

    // 6. Consulta SQL raw com paginação
    let hasPendingJustifications = false;
    let skip = 0;
    const batchSize = 500;

    while (true) {
      const justifications: any[] = await this.prisma.$queryRaw`
        SELECT 
          j.*, 
          c.name as collaborator_name,
          c.cpf,
          c.admission_date,
          c.dismissal_date,
          c.status,
          c.role,
          c.education,
          p.project,
          p.project_code,
          p.subproject,
          p.subproject_code,
          p.area,
          (
            SELECT COALESCE(SUM(a.hours_worked), 0)
            FROM apontamento a
            WHERE a.collaborator_id = j.collaborator_id
            AND a.project_id = j.project_id
            AND a.date BETWEEN ${startDate} AND ${endDate}
          ) as total_hours,
          (
            SELECT a.task
            FROM apontamento a
            WHERE a.collaborator_id = j.collaborator_id
            AND a.project_id = j.project_id
            AND a.date BETWEEN ${startDate} AND ${endDate}
            LIMIT 1
          ) as task
        FROM justification j
        JOIN collaborator c ON j.collaborator_id = c.id
        JOIN project p ON j.project_id = p.id
        WHERE 
          j.start_justification_date >= ${startDate}
          AND j.end_justification_date <= ${endDate}
          ${params.projects?.length ? Prisma.sql`AND p.project_code IN (${Prisma.join(params.projects)})` : Prisma.empty}
          ${params.subprojects?.length ? Prisma.sql`AND p.subproject_code IN (${Prisma.join(params.subprojects)})` : Prisma.empty}
          ${params.areas?.length ? Prisma.sql`AND p.area IN (${Prisma.join(params.areas)})` : Prisma.empty}
        ORDER BY j.id ASC
        LIMIT ${batchSize}
        OFFSET ${skip}
      `;

      if (justifications.length === 0) break;

      // 7. Processa cada lote
      for (const j of justifications) {
        if (j.status === 'pendente') {
          hasPendingJustifications = true;
        }

        worksheet.addRow({
          activity: j.task || '',
          employeeName: j.collaborator_name,
          cpf: j.cpf,
          hireDate: DateTime.fromJSDate(j.admission_date).toFormat('dd/MM/yyyy'),
          dismissalDate: j.dismissal_date
            ? DateTime.fromJSDate(j.dismissal_date).toFormat('dd/MM/yyyy')
            : 'Ativo',
          jobTitle: j.role,
          degreeLevel: j.education,
          justification: j.justification,
          worktime: j.total_hours,
          check: '',
          comment: ''
        }).commit();
      }

      skip += batchSize;
    }

    // 8. Finalização
    await worksheet.commit();
    await workbook.commit();

    return {
      stream: passThrough,
      hasPendingJustifications
    };
  }
}