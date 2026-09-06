export const routes = {
  login: '/',
  painel: '/painel',
  mapa: '/mapa',
  campos: '/campos',
  campoExemplo: '/campos/exemplo',
  preceptores: '/preceptores',
  preceptorExemplo: '/preceptores/exemplo',
  vinculos: '/vinculos',
  contratos: '/contratos',
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
      { to: routes.preceptores, label: 'Preceptores' },
      { to: routes.vinculos, label: 'Vínculos' },
      { to: routes.contratos, label: 'Contratos' },
    ],
  },
  {
    title: 'Operação',
    items: [
      { to: routes.distribuicao, label: 'Distribuição por Especialidade' },
      { to: routes.simulador, label: 'Simulador de Cenários' },
      { to: routes.avaliacoes, label: 'Avaliações' },
    ],
  },
];
