export const routes = {
  login: '/',
  painel: '/painel',
  mapa: '/mapa',
  campos: '/campos',
  campoExemplo: '/campos/exemplo',
  consultorios: '/consultorios',
  preceptores: '/preceptores',
  preceptorExemplo: '/preceptores/exemplo',
  vinculos: '/vinculos',
  contratos: '/contratos',
  alocacoes: '/alocacoes',
  faixas: '/faixas',
  importacoes: '/importacoes',
  distribuicao: '/distribuicao',
  simulador: '/simulador',
  avaliacoes: '/avaliacoes',
};

export const navigation = [
  {
    title: 'Visão geral',
    items: [
      { to: routes.painel, label: 'Painel de Indicadores' },
      { to: routes.mapa, label: 'Mapa de Campos' },
    ],
  },
  {
    title: 'Registro central',
    items: [
      { to: routes.campos, label: 'Campos de Estágio' },
      { to: routes.consultorios, label: 'Consultórios' },
      { to: routes.preceptores, label: 'Preceptores' },
      { to: routes.vinculos, label: 'Vínculos' },
      { to: routes.contratos, label: 'Contratos' },
    ],
  },
  {
    title: 'Operação',
    items: [
      { to: routes.alocacoes, label: 'Alunos e Alocações' },
      { to: routes.faixas, label: 'Faixas de Ocupação' },
      { to: routes.importacoes, label: 'Importação' },
      { to: routes.distribuicao, label: 'Distribuição por Especialidade' },
      { to: routes.simulador, label: 'Simulador de Cenários' },
      { to: routes.avaliacoes, label: 'Avaliações' },
    ],
  },
];
