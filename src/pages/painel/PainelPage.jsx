import Card from '../../components/ui/Card.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import Notice from '../../components/ui/Notice.jsx';
import StatCard from '../../components/ui/StatCard.jsx';
import { fieldStatuses } from '../../constants/preview.js';

export default function PainelPage() {
  return (
    <div className="stack">
      <div className="stats-grid">
        <StatCard
          label="Campos ativos"
          description="Contratos vigentes no período"
        />
        <StatCard
          label="Custo mensal total"
          description="Campos + preceptores"
        />
        <StatCard
          label="Score médio de campo"
          description="Qualificação dos campos"
        />
        <StatCard
          label="Cobertura de demanda"
          description="Vagas ofertadas ÷ alunos do período"
        />
      </div>
      <div className="content-grid">
        <Card
          title="Custo × Score de Qualidade"
          description="Cada ponto representa um campo."
        >
          <div className="chart-placeholder">
            <span className="chart-placeholder__axis">Score de qualidade</span>
            <EmptyState
              title="Sem dados para plotar"
              description="Compare custo e qualidade para apoiar a avaliação dos campos."
            />
          </div>
          <p className="chart-caption">Custo por aluno</p>
        </Card>
        <Card title="Status dos Campos">
          <dl className="status-list">
            {fieldStatuses.map(({ label, tone }) => (
              <div key={label}>
                <dt>
                  <span className={`status-dot status-dot--${tone}`} />
                  {label}
                </dt>
                <dd>—</dd>
              </div>
            ))}
            <div className="status-list__total">
              <dt>Total</dt>
              <dd>—</dd>
            </div>
          </dl>
          <p className="muted">Histórico de mudança de status por período.</p>
        </Card>
      </div>
      <Notice>
        O sistema calcula e apresenta dados para{' '}
        <strong>apoiar a decisão humana</strong>. Geolocalização é informação de
        apoio, nunca fator único de decisão.
      </Notice>
    </div>
  );
}
