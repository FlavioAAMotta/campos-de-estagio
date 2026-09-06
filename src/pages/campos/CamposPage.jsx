import { Link } from 'react-router';
import FilterBar from '../../components/shared/FilterBar.jsx';
import PendingButton from '../../components/shared/PendingButton.jsx';
import Card from '../../components/ui/Card.jsx';
import DataTable from '../../components/ui/DataTable.jsx';
import { Field, SelectField } from '../../components/ui/Field.jsx';
import { routes } from '../../constants/routes.js';

const columns = [
  { key: 'nome', label: 'Campo' },
  { key: 'regiao', label: 'Região' },
  { key: 'relacionamento', label: 'Relacionamento' },
  { key: 'capacidade', label: 'Vagas (soma dos consultórios)' },
  { key: 'custo', label: 'Custo/mês' },
  { key: 'score', label: 'Score' },
  { key: 'status', label: 'Status' },
];

export default function CamposPage() {
  return (
    <div className="stack">
      <FilterBar>
        <Field label="Buscar" placeholder="Nome do campo…" />
        <SelectField label="Especialidade" options={['Todas']} />
        <SelectField label="Relacionamento" options={['Todos']} />
        <SelectField label="Status" options={['Todos']} />
        <PendingButton>Aplicar</PendingButton>
        <PendingButton variant="secondary">Limpar</PendingButton>
      </FilterBar>
      <Card
        title="Campos de Estágio"
        description="— registros"
        action={<PendingButton>Novo Campo</PendingButton>}
      >
        <DataTable
          caption="Campos de estágio"
          columns={columns}
          emptyTitle="Nenhum campo cadastrado"
          emptyDescription="Os campos cadastrados aparecerão aqui após a integração."
        >
          <Link className="button button--secondary" to={routes.campoExemplo}>
            Ver ficha de exemplo
          </Link>
        </DataTable>
      </Card>
    </div>
  );
}
