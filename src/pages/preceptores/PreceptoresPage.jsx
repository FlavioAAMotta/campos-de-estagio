import { Link } from 'react-router';
import FilterBar from '../../components/shared/FilterBar.jsx';
import PendingButton from '../../components/shared/PendingButton.jsx';
import Card from '../../components/ui/Card.jsx';
import DataTable from '../../components/ui/DataTable.jsx';
import { Field, SelectField } from '../../components/ui/Field.jsx';
import { routes } from '../../constants/routes.js';

const columns = [
  { key: 'nome', label: 'Preceptor' },
  { key: 'titulacao', label: 'Titulação' },
  { key: 'campos', label: 'Campos' },
  { key: 'disponibilidade', label: 'Disponibilidade' },
  { key: 'score', label: 'Score' },
];

export default function PreceptoresPage() {
  return (
    <div className="stack">
      <FilterBar>
        <Field label="Buscar" placeholder="Nome do preceptor…" />
        <SelectField label="Titulação" options={['Todas']} />
        <SelectField label="Campo vinculado" options={['Todos']} />
        <PendingButton>Aplicar</PendingButton>
      </FilterBar>
      <Card
        title="Preceptores"
        description="— registros"
        action={<PendingButton>Novo Preceptor</PendingButton>}
      >
        <DataTable
          caption="Preceptores"
          columns={columns}
          emptyTitle="Nenhum preceptor cadastrado"
          emptyDescription="Um preceptor pode ter vínculo com um ou mais campos."
        >
          <Link
            className="button button--secondary"
            to={routes.preceptorExemplo}
          >
            Ver ficha de exemplo
          </Link>
        </DataTable>
      </Card>
    </div>
  );
}
