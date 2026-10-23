import FilterBar from '../../components/shared/FilterBar.jsx';
import PendingButton from '../../components/shared/PendingButton.jsx';
import Card from '../../components/ui/Card.jsx';
import DataTable from '../../components/ui/DataTable.jsx';
import { SelectField } from '../../components/ui/Field.jsx';
import Notice from '../../components/ui/Notice.jsx';

const columns = [
  { key: 'especialidade', label: 'Especialidade' },
  { key: 'tipoAtendimento', label: 'Tipo de atendimento' },
  { key: 'ideal', label: 'Ideal' },
  { key: 'maximoAceitavel', label: 'Máximo aceitável' },
  {
    key: 'acoes',
    label: 'Ações',
    render: () => (
      <PendingButton variant="secondary">Editar faixa</PendingButton>
    ),
  },
];

export default function FaixasPage() {
  return (
    <div className="stack">
      <FilterBar>
        <SelectField label="Especialidade" options={['Todas']} />
        <SelectField
          label="Tipo de atendimento"
          options={['Todos', 'Ambulatorial', 'Pronto atendimento']}
        />
        <PendingButton>Aplicar</PendingButton>
        <PendingButton variant="secondary">Limpar</PendingButton>
      </FilterBar>
      <Card
        title="Faixas de Ocupação"
        description="Uma faixa por especialidade e tipo de atendimento."
      >
        <DataTable
          caption="Faixas de ocupação por especialidade e tipo de atendimento"
          columns={columns}
          emptyTitle="Nenhuma faixa disponível"
          emptyDescription="As faixas de cada especialidade aparecerão aqui após a integração."
        />
      </Card>
      <Notice>
        Cada especialidade tem uma faixa por tipo de atendimento (ex.: Cirurgia
        em pronto atendimento, no máximo 2 alunos). A listagem aceita os filtros{' '}
        <code>especialidadeId</code> e <code>tipoAtendimento</code>. As faixas
        ficam no banco de dados, nunca em constantes do código. A API é quem
        aplica os limites ao classificar a ocupação; o frontend apenas exibe e
        edita os valores.
      </Notice>
    </div>
  );
}
