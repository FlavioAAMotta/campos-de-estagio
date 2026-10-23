import FilterBar from '../../components/shared/FilterBar.jsx';
import PendingButton from '../../components/shared/PendingButton.jsx';
import Card from '../../components/ui/Card.jsx';
import DataTable from '../../components/ui/DataTable.jsx';
import { Field, SelectField } from '../../components/ui/Field.jsx';
import Notice from '../../components/ui/Notice.jsx';
import { occupancyClasses } from '../../constants/preview.js';

const studentColumns = [
  { key: 'nome', label: 'Nome' },
  { key: 'matricula', label: 'Matrícula' },
];

const allocationColumns = [
  { key: 'aluno', label: 'Aluno' },
  { key: 'consultorio', label: 'Consultório' },
  { key: 'campo', label: 'Campo' },
  { key: 'classificacao', label: 'Classificação da ocupação' },
];

export default function AlocacoesPage() {
  return (
    <div className="stack">
      <div className="two-columns">
        <Card
          title="Alunos"
          description="0 registros"
          action={<PendingButton>Novo Aluno</PendingButton>}
        >
          <DataTable
            caption="Alunos"
            columns={studentColumns}
            emptyTitle="Nenhum aluno cadastrado"
            emptyDescription="Os alunos cadastrados aparecerão aqui após a integração."
          />
        </Card>
        <Card title="Classificação da ocupação">
          <dl className="status-list">
            {occupancyClasses.map(({ code, tone, description }) => (
              <div key={code}>
                <dt>
                  <span className={`status-dot status-dot--${tone}`} />
                  {code}
                </dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
      <FilterBar>
        <SelectField label="Consultório" options={['Todos']} />
        <Field label="Aluno" placeholder="Nome ou matrícula…" />
        <PendingButton>Aplicar</PendingButton>
        <PendingButton variant="secondary">Limpar</PendingButton>
      </FilterBar>
      <Card
        title="Alocações"
        description="0 registros"
        action={<PendingButton>Nova Alocação</PendingButton>}
      >
        <DataTable
          caption="Alocações de alunos em consultórios"
          columns={allocationColumns}
          emptyTitle="Nenhuma alocação registrada"
          emptyDescription="As alocações e a ocupação de cada consultório aparecerão aqui."
        />
      </Card>
      <Notice>
        Todo alerta de ocupação mostra a sua evidência: quantos alunos há no
        consultório, o valor ideal e o máximo aceitável. Quando a alocação é
        bloqueada, a resposta de erro traz a mesma evidência.
      </Notice>
    </div>
  );
}
