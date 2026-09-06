import { Link } from 'react-router';
import QualificationTable from '../../components/shared/QualificationTable.jsx';
import Card from '../../components/ui/Card.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import StatCard from '../../components/ui/StatCard.jsx';
import { preceptorAttributes } from '../../constants/preview.js';
import { routes } from '../../constants/routes.js';

export default function PreceptorPage() {
  return (
    <div className="stack">
      <Link to={routes.preceptores}>← Voltar para Preceptores</Link>
      <div className="detail-heading card">
        <div className="stack">
          <span className="eyebrow">Ficha de exemplo</span>
          <h2>Nome do Preceptor</h2>
          <p className="muted">
            CRM: — · Especialidade: — · Campos vinculados: —
          </p>
        </div>
        <StatCard label="Score preceptoria" description="Ainda não calculado" />
      </div>
      <div className="content-grid">
        <QualificationTable attributes={preceptorAttributes} />
        <div className="stack">
          <Card title="Campos Vinculados">
            <EmptyState title="Nenhum vínculo com campo" />
          </Card>
          <Card title="Histórico de Contratação">
            <EmptyState title="Sem histórico registrado" />
          </Card>
        </div>
      </div>
    </div>
  );
}
