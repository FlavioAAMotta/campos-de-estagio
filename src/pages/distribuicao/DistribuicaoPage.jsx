import FilterBar from '../../components/shared/FilterBar.jsx';
import PendingButton from '../../components/shared/PendingButton.jsx';
import Card from '../../components/ui/Card.jsx';
import DataTable from '../../components/ui/DataTable.jsx';
import { SelectField } from '../../components/ui/Field.jsx';
import Notice from '../../components/ui/Notice.jsx';

const columns = [
  { key: 'especialidade', label: 'Especialidade' },
  { key: 'atendimento', label: 'Tipo de atendimento' },
  { key: 'consultorio', label: 'Consultório' },
  { key: 'minimo', label: 'Mínimo' },
  { key: 'maximo', label: 'Máximo' },
  { key: 'alocados', label: 'Alunos alocados' },
  { key: 'saldo', label: 'Saldo' },
];

export default function DistribuicaoPage() {
  return (
    <div className="stack">
      <FilterBar>
        <SelectField label="Período" options={['Selecione um período']} />
        <SelectField label="Grade" options={['Selecione uma grade']} />
        <PendingButton variant="secondary">Exportar Grade</PendingButton>
      </FilterBar>
      <Card
        title="Capacidade por Especialidade"
        description="Distribuição por consultório e tipo de atendimento."
      >
        <DataTable
          caption="Distribuição de alunos por especialidade"
          columns={columns}
          emptyTitle="Nenhuma distribuição disponível"
          emptyDescription="As capacidades e os alunos alocados aparecerão aqui."
        />
      </Card>
      <Notice>
        Os limites de capacidade dependem da configuração de cada consultório,
        especialidade e tipo de atendimento.
      </Notice>
    </div>
  );
}
