import { useState } from 'react';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import { SelectField } from '../../components/ui/Field.jsx';

export default function AvaliacoesPage() {
  const [target, setTarget] = useState('campo');

  return (
    <div className="stack">
      <div className="spread">
        <div
          className="inline-actions"
          role="group"
          aria-label="Tipo de avaliação"
        >
          <Button
            variant="secondary"
            aria-pressed={target === 'campo'}
            onClick={() => setTarget('campo')}
          >
            Avaliações de Campo
          </Button>
          <Button
            variant="secondary"
            aria-pressed={target === 'preceptor'}
            onClick={() => setTarget('preceptor')}
          >
            Avaliações de Preceptor
          </Button>
        </div>
        <SelectField
          label="Período"
          options={['Selecione um período']}
          disabled
        />
      </div>
      <div className="two-columns">
        <Card title={`NPS do ${target}`}>
          <div aria-live="polite" className="stack">
            <strong className="score-value">—</strong>
            <span className="muted">promotores − detratores</span>
            {['Promotores', 'Neutros', 'Detratores'].map((label) => (
              <div className="rating-row" key={label}>
                <div className="spread">
                  <span>{label}</span>
                  <span>—</span>
                </div>
                <div className="rating-row__track" />
              </div>
            ))}
            <p className="muted">
              Avaliação feita pelo aluno ao final do estágio, separadamente para
              campo e preceptor. A nota acadêmica do aluno é um registro
              distinto.
            </p>
          </div>
        </Card>
        <Card title="Comentários" description="— respostas">
          <EmptyState
            title="Nenhuma avaliação recebida"
            description="As avaliações e os comentários aparecerão aqui ao final de cada estágio."
          />
        </Card>
      </div>
    </div>
  );
}
