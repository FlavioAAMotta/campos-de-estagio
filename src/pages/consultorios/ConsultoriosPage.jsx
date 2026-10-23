import FilterBar from '../../components/shared/FilterBar.jsx';
import PendingButton from '../../components/shared/PendingButton.jsx';
import Card from '../../components/ui/Card.jsx';
import DataTable from '../../components/ui/DataTable.jsx';
import { SelectField } from '../../components/ui/Field.jsx';
import Notice from '../../components/ui/Notice.jsx';

const columns = [
  { key: 'numero', label: 'Número' },
  { key: 'campo', label: 'Campo' },
  { key: 'especialidade', label: 'Especialidade' },
  { key: 'capacidadeMin', label: 'Capacidade mínima' },
  { key: 'capacidadeMax', label: 'Capacidade máxima' },
];

export default function ConsultoriosPage() {
  return (
    <div className="stack">
      <FilterBar>
        <SelectField label="Campo" options={['Todos']} />
        <SelectField label="Especialidade" options={['Todas']} />
        <PendingButton>Aplicar</PendingButton>
        <PendingButton variant="secondary">Limpar</PendingButton>
      </FilterBar>
      <Card
        title="Consultórios"
        description="0 registros"
        action={<PendingButton>Novo Consultório</PendingButton>}
      >
        <DataTable
          caption="Consultórios"
          columns={columns}
          emptyTitle="Nenhum consultório cadastrado"
          emptyDescription="Os consultórios cadastrados aparecerão aqui após a integração."
        />
      </Card>
      <Notice>
        Todo consultório pertence a um campo e a uma especialidade. A listagem
        por campo usa o filtro <code>campoId</code>, e a capacidade mínima não
        pode ser maior que a máxima.
      </Notice>
    </div>
  );
}
