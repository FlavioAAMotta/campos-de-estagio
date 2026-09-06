import PendingButton from '../../components/shared/PendingButton.jsx';
import Card from '../../components/ui/Card.jsx';
import DataTable from '../../components/ui/DataTable.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import StatCard from '../../components/ui/StatCard.jsx';
import { simulationMetrics } from '../../constants/preview.js';

const columns = [
  { key: 'metric', label: 'Métrica' },
  { key: 'a', label: 'Cenário A' },
  { key: 'b', label: 'Cenário B' },
  { key: 'c', label: 'Cenário C' },
];

export default function SimuladorPage() {
  return (
    <div className="stack">
      <Card
        title="Seleção de Campos"
        description="Escolha um conjunto de campos para compor a hipótese de contratação."
      >
        <EmptyState
          title="Nenhum campo disponível"
          description="Cadastre campos para montar cenários."
        />
        <div className="spread">
          <span className="muted">Selecionados: 0</span>
          <PendingButton>Calcular Cenário</PendingButton>
        </div>
      </Card>
      <div className="stats-grid">
        {simulationMetrics.map((label) => (
          <StatCard key={label} label={label} />
        ))}
      </div>
      <Card
        title="Comparar Cenários"
        description="Hipóteses de contratação lado a lado."
      >
        <DataTable
          caption="Comparação de cenários"
          columns={columns}
          rows={['Campos incluídos', ...simulationMetrics].map((metric) => ({
            id: metric,
            metric,
          }))}
        />
      </Card>
    </div>
  );
}
