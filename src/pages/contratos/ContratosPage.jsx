import PendingButton from '../../components/shared/PendingButton.jsx';
import Card from '../../components/ui/Card.jsx';
import DataTable from '../../components/ui/DataTable.jsx';

const columns = [
  { key: 'codigo', label: 'Código' },
  { key: 'contratado', label: 'Contratado' },
  { key: 'modelo', label: 'Modelo' },
  { key: 'valor', label: 'Valor' },
  { key: 'vigencia', label: 'Vigência' },
  { key: 'situacao', label: 'Situação' },
];

export default function ContratosPage() {
  return (
    <div className="stack">
      <div className="two-columns">
        <Card title="1 · Contrato Único com o Campo">
          <p>
            A instituição contrata apenas o campo, que repassa internamente ao
            preceptor ou aos preceptores vinculados.
          </p>
          <span className="badge">1 contrato · repasse interno</span>
        </Card>
        <Card title="2 · Contratos Separados">
          <p>
            Um contrato com o campo e outro, ou outros, diretamente com o
            preceptor ou preceptores.
          </p>
          <span className="badge">N contratos · pagamento direto</span>
        </Card>
      </div>
      <Card
        title="Contratos"
        description="— registros"
        action={<PendingButton>Novo Contrato</PendingButton>}
      >
        <DataTable
          caption="Contratos"
          columns={columns}
          emptyTitle="Nenhum contrato registrado"
          emptyDescription="Vigência, renovação e forma de cálculo do valor aguardam definição com a coordenação."
        />
      </Card>
    </div>
  );
}
