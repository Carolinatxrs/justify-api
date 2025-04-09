import { DateTime } from 'luxon';

export const generateMockJustifications = (count: number, baseYear: string) => {
  const educations = ['Graduação', 'Pós-graduação', 'Mestrado', 'Doutorado'];
  const roles = ['Desenvolvedor', 'Analista', 'Gerente', 'Designer'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    justification: `Justificativa fake ${i + 1} para testes`,
    baseYear,
    createdAt: new Date(),
    updatedAt: new Date(),
    collaborator: {
      name: `Colaborador ${i + 1}`,
      cpf: `123.456.789-${String(i + 1).padStart(2, '0')}`,
      admissionDate: DateTime.now().minus({ years: 2 }).toJSDate(),
      dismissalDate: i % 5 === 0 ? DateTime.now().toJSDate() : null,
      role: roles[i % roles.length],
      education: educations[i % educations.length]
    },
    project: {
      project: `Projeto ${i + 1}`,
      projectCode: `PROJ${(i % 3) + 1}`, // 3 projetos diferentes
      subproject: `Subprojeto ${i + 1}`,
      subprojectCode: `SUB${(i % 2) + 1}`, // 2 subprojetos
      area: ['TI', 'RH', 'Financeiro'][i % 3] // 3 áreas
    }
  }));
};