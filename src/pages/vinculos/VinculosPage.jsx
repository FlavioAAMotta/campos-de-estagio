import FilterBar from '../../components/shared/FilterBar.jsx';
import PendingButton from '../../components/shared/PendingButton.jsx';
import Card from '../../components/ui/Card.jsx';
import DataTable from '../../components/ui/DataTable.jsx';
import { Field, SelectField } from '../../components/ui/Field.jsx';
import Notice from '../../components/ui/Notice.jsx';

const columns = [
  { key: 'aluno', label: 'Aluno' },
  { key: 'campo', label: 'Campo' },
  { key: 'preceptor', label: 'Preceptor' },
  { key: 'moradia', label: 'Moradia (restrita)' },
  { key: 'periodo', label: 'Período' },
  { key: 'semanas', label: 'Semanas' },
  { key: 'horas', label: 'Horas' },
  { key: 'situacao', label: 'Situação' },
];

export default function VinculosPage() {
  return (
    <div className="stack">
      <Notice tone="warning">
        A região de moradia do aluno exige acesso autorizado e deve ser
        consultada apenas quando necessária.
      </Notice>
      <FilterBar>
        <SelectField label="Período" options={['Selecione um período']} />
        <SelectField label="Situação" options={['Todas']} />
        <Field
          label="Aluno, campo ou preceptor"
          placeholder="Buscar vínculo…"
        />
        <PendingButton variant="secondary">Revelar moradia</PendingButton>
      </FilterBar>
      <Card
        title="Vínculos Aluno · Campo · Preceptor"
        description="— registros"
        action={<PendingButton>Novo Vínculo</PendingButton>}
      >
        <DataTable
          caption="Vínculos de alunos"
          columns={columns}
          emptyTitle="Nenhum vínculo no período"
          emptyDescription="Cada vínculo une aluno, campo, preceptor e período, com carga horária em semanas e horas."
        />
      </Card>
    </div>
  );
}
