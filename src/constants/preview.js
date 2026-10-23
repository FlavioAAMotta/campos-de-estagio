// Rótulos para a prévia. Os cadastros e regras serão definidos pela API do grupo.
// Os perfis seguem os papéis da API: ADMIN faz tudo e CONSULTA só lê (GET).
export const profiles = ['Administração (ADMIN)', 'Consulta (CONSULTA)'];

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

// Códigos de erro por linha da importação, conforme o contrato comum.
export const importErrorCodes = [
  {
    id: 'CAMPO_OBRIGATORIO',
    explicacao: 'Um campo exigido está vazio ou ausente na linha.',
  },
  {
    id: 'TIPO_INVALIDO',
    explicacao: 'O valor não tem o tipo esperado, como texto em vez de número.',
  },
  {
    id: 'CAPACIDADE_INVALIDA',
    explicacao: 'A capacidade mínima é maior que a máxima ou é negativa.',
  },
  {
    id: 'MUNICIPIO_INEXISTENTE',
    explicacao: 'O município informado não existe na lista da API.',
  },
  {
    id: 'ESPECIALIDADE_INEXISTENTE',
    explicacao: 'A especialidade informada não existe na lista da API.',
  },
  {
    id: 'LINHA_DUPLICADA',
    explicacao: 'A mesma linha aparece mais de uma vez no lote enviado.',
  },
  {
    id: 'CONSULTORIO_JA_CADASTRADO',
    explicacao: 'O consultório já existe no campo informado.',
  },
];
