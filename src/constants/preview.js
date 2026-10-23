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

// Classificações de ocupação descritas no contrato comum. Os limites vêm das faixas da API.
export const occupancyClasses = [
  {
    code: 'IDEAL',
    tone: 'success',
    description: 'Dentro da faixa ideal. A alocação segue sem alerta.',
  },
  {
    code: 'ACEITAVEL',
    tone: 'warning',
    description: 'Acima do ideal, mas permitida. A alocação é sinalizada.',
  },
  {
    code: 'INACEITAVEL',
    tone: 'danger',
    description: 'Acima do máximo aceitável. A API bloqueia com erro 400.',
  },
];
