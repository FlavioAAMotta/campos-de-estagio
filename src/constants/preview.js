// Rótulos para a prévia. Os cadastros e regras serão definidos pela API do grupo.
export const profiles = ['Coordenação', 'Secretaria', 'Preceptor', 'Aluno'];

export const fieldAttributes = [
  'Estrutura física (nº de consultórios)',
  'Casuística e volume de atendimento',
  'Equipamentos e insumos',
  'Recursos humanos',
  'Custo',
  'Tipo de relacionamento',
  'Localização / deslocamento',
  'Segurança da unidade',
];

export const preceptorAttributes = [
  'Formação técnica / titulação',
  'Relacionamento com o aluno',
  'Qualidade das práticas',
  'Participação e engajamento',
  'Disponibilidade',
  'Histórico de seleção / contratação',
];

export const fieldStatuses = [
  { label: 'Ativo', tone: 'success' },
  { label: 'Em renegociação', tone: 'warning' },
  { label: 'Em prospecção', tone: 'info' },
  { label: 'Encerrado', tone: 'danger' },
];

export const simulationMetrics = [
  'Custo total',
  'Custo médio / aluno',
  'Score médio',
  'Cobertura de demanda',
];
