import PendingButton from '../../components/shared/PendingButton.jsx';
import Card from '../../components/ui/Card.jsx';
import DataTable from '../../components/ui/DataTable.jsx';
import Notice from '../../components/ui/Notice.jsx';

const columns = [
  { key: 'especialidade', label: 'Especialidade' },
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
      <Card
        title="Faixas de Ocupação"
        description="Uma faixa por especialidade."
      >
        <DataTable
          caption="Faixas de ocupação por especialidade"
          columns={columns}
          emptyTitle="Nenhuma faixa disponível"
          emptyDescription="As faixas de cada especialidade aparecerão aqui após a integração."
        />
      </Card>
      <Notice>
        As faixas ficam no banco de dados, nunca em constantes do código. A API
        é quem aplica os limites ao classificar a ocupação; o frontend apenas
        exibe e edita os valores.
      </Notice>
    </div>
  );
}
