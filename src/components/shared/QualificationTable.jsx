import Card from '../ui/Card.jsx';
import DataTable from '../ui/DataTable.jsx';

const columns = [
  { key: 'name', label: 'Atributo' },
  { key: 'value', label: 'Valor registrado' },
  { key: 'score', label: 'Nota' },
];

export default function QualificationTable({ attributes }) {
  return (
    <Card
      title="Atributos de Qualificação"
      description="Valores e notas aguardam preenchimento."
    >
      <DataTable
        caption="Atributos de qualificação"
        columns={columns}
        rows={attributes.map((name) => ({ id: name, name }))}
      />
    </Card>
  );
}
