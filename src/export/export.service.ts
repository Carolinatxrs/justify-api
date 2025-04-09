import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { DateTime } from 'luxon';
import { PassThrough } from 'stream';
import { PrismaService } from 'src/prisma.service';
import { generateMockJustifications } from 'src/utils/mockJustifications';

@Injectable()
export class ExportService {
  constructor(private prisma: PrismaService) {}

  async generateReport(params: {
    baseYear: string;
    useMock?: boolean; // Novo parâmetro para controlar mock
  }) {
    // 1. Configuração do stream
    const passThrough = new PassThrough();

    // 2. Configuração do workbook
    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
      stream: passThrough,
      useStyles: true,
      useSharedStrings: true, // Otimiza memória para dados repetidos
      filename: `RDFinanceiro_RDA_RH_${params.baseYear}.xlsx`
    });

    const worksheet = workbook.addWorksheet('Justificativas');

    // 3. Definição de estilos (mantido igual)
    const headerStyle: Partial<ExcelJS.Style> = {
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFC300' } },
      font: { name: 'Calibri', size: 11, bold: true, color: { argb: '000000' } },
      border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    };

    const bodyStyle: Partial<ExcelJS.Style> = {
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'D4D4D4' } },
      font: { name: 'Calibri', size: 11, color: { argb: '000000' } },
      border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    };

    // 4. Configuração das colunas (simplificado)
    worksheet.columns = [
      { header: 'Employee Name', key: 'employeeName', width: 25, style: headerStyle },
      { header: 'CNPJ/CPF', key: 'cpf', width: 15, style: headerStyle },
      { header: 'Hire Date', key: 'hireDate', width: 15, style: headerStyle },
      { header: 'Dismissal Date', key: 'dismissalDate', width: 15, style: headerStyle },
      { header: 'Job Title', key: 'jobTitle', width: 20, style: headerStyle },
      { header: 'Degree Level', key: 'degreeLevel', width: 20, style: headerStyle },
      { header: 'Justification', key: 'justification', width: 40, style: bodyStyle },
      { header: 'Check', key: 'check', width: 15, style: bodyStyle },
      { header: 'Comment', key: 'comment', width: 30, style: bodyStyle }
    ];

    // 5. Lógica de dados (mock ou real)
    const batchSize = 500;
    let skip = 0;

    if (params.useMock) {
      // 6. Processamento com mock
      const totalRecords = 165; // Total de registros fake
      const mockData = generateMockJustifications(totalRecords, params.baseYear);

      for (skip = 0; skip < mockData.length; skip += batchSize) {
        const batch = mockData.slice(skip, skip + batchSize);
        
        batch.forEach(j => {
          worksheet.addRow({
            employeeName: j.collaborator.name,
            cpf: j.collaborator.cpf,
            hireDate: DateTime.fromJSDate(j.collaborator.admissionDate).toFormat('dd/MM/yyyy'),
            dismissalDate: j.collaborator.dismissalDate
              ? DateTime.fromJSDate(j.collaborator.dismissalDate).toFormat('dd/MM/yyyy')
              : 'Ativo',
            jobTitle: j.collaborator.role,
            degreeLevel: j.collaborator.education,
            justification: j.justification,
            check: '',
            comment: ''
          }).commit();
        });
      }
    } else {
      // 7. Processamento com dados reais
      while (true) {
        const justifications = await this.prisma.justification.findMany({
          where: {
            baseYear: params.baseYear
          },
          include: {
            collaborator: true,
            project: true
          },
          skip,
          take: batchSize,
          orderBy: { id: 'asc' }
        });

        if (justifications.length === 0) break;

        justifications.forEach(j => {
          worksheet.addRow({
            employeeName: j.collaborator.name,
            cpf: j.collaborator.cpf,
            hireDate: DateTime.fromJSDate(j.collaborator.admissionDate).toFormat('dd/MM/yyyy'),
            dismissalDate: j.collaborator.dismissalDate
              ? DateTime.fromJSDate(j.collaborator.dismissalDate).toFormat('dd/MM/yyyy')
              : 'Ativo',
            jobTitle: j.collaborator.role,
            degreeLevel: j.collaborator.education,
            justification: j.justification,
            check: '',
            comment: ''
          }).commit();
        });

        skip += batchSize;
      }
    }

    // 8. Finalização
    await worksheet.commit();
    await workbook.commit();

    return {
      stream: passThrough
    };
  }
}