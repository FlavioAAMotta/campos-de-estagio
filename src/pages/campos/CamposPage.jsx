import { Link } from 'react-router';
import FilterBar from '../../components/shared/FilterBar.jsx';
import PendingButton from '../../components/shared/PendingButton.jsx';
import Card from '../../components/ui/Card.jsx';
import DataTable from '../../components/ui/DataTable.jsx';
import { Field, SelectField } from '../../components/ui/Field.jsx';
import { routes } from '../../constants/routes.js';

const columns = [
  { key: 'nome', label: 'Nome' },
  { key: 'endereco', label: 'Endereço' },
  { key: 'classificacao', label: 'Classificação' },
  { key: 'municipio', label: 'Município' },
  { key: 'consultorios', label: 'Consultórios' },
];

export default function CamposPage() {
  return (
    <div className="stack">
      <FilterBar>
        <Field label="Buscar" placeholder="Nome do campo…" />
        <SelectField label="Município" options={['Todos']} />
        <SelectField label="Classificação" options={['Todas']} />
        <PendingButton>Aplicar</PendingButton>
        <PendingButton variant="secondary">Limpar</PendingButton>
      </FilterBar>
      <Card
        title="Campos de Estágio"
        description="0 registros"
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
