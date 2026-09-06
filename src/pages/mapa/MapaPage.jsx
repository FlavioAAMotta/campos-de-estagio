import PendingButton from '../../components/shared/PendingButton.jsx';
import Card from '../../components/ui/Card.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import Notice from '../../components/ui/Notice.jsx';

export default function MapaPage() {
  return (
    <div className="content-grid">
      <Card
        title="Distribuição Geográfica"
        action={
          <div className="inline-actions">
            <PendingButton variant="secondary">Campos</PendingButton>
            <PendingButton variant="secondary">Alunos por região</PendingButton>
          </div>
        }
      >
        <div className="map-placeholder">
          <EmptyState
            title="Mapa aguardando dados"
            description="A distribuição dos campos será exibida aqui."
          />
        </div>
      </Card>
      <div className="stack">
        <Card title="Legenda">
          <p className="muted">
            A legenda acompanhará a classificação dos campos cadastrados.
          </p>
          <p>
            O tamanho do marcador pode representar capacidade; a cor, o tipo de
            relacionamento.
          </p>
        </Card>
        <Notice tone="warning">
          Geolocalização é informação de apoio,{' '}
          <strong>nunca fator único</strong> de decisão. Moradia de aluno
          somente em granularidade de região.
        </Notice>
      </div>
    </div>
  );
}
