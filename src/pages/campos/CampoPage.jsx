import { Link } from 'react-router';
import QualificationTable from '../../components/shared/QualificationTable.jsx';
import PendingButton from '../../components/shared/PendingButton.jsx';
import Card from '../../components/ui/Card.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import StatCard from '../../components/ui/StatCard.jsx';
import { fieldAttributes } from '../../constants/preview.js';
import { routes } from '../../constants/routes.js';

export default function CampoPage() {
  return (
    <div className="stack">
      <Link to={routes.campos}>← Voltar para Campos</Link>
      <div className="detail-heading card">
        <div className="stack">
          <span className="eyebrow">Ficha de exemplo</span>
          <h2>Nome do Campo de Estágio</h2>
          <p className="muted">Região: — · Consultórios: — · Custo/mês: —</p>
        </div>
        <StatCard label="Score do campo" description="Ainda não calculado" />
      </div>
      <div className="detail-tabs" aria-label="Seções previstas para a ficha">
        <strong>Qualificação</strong>
        <span>Preceptores</span>
        <span>Vínculos</span>
        <span>Contratos</span>
        <span>Avaliações</span>
      </div>
      <div className="content-grid">
        <QualificationTable attributes={fieldAttributes} />
        <div className="stack">
          <Card
            title="Capacidade por Consultório"
            description="Limites por consultório, especialidade e tipo de atendimento."
          >
            <EmptyState title="Nenhuma capacidade configurada" />
          </Card>
          <Card title="Ações">
            <div className="stack">
              <PendingButton>Editar Qualificação</PendingButton>
              <PendingButton variant="secondary">
                Registrar Renegociação
              </PendingButton>
              <PendingButton variant="secondary">
                Encerrar Contrato
              </PendingButton>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
