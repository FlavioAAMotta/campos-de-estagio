import PendingButton from '../../components/shared/PendingButton.jsx';
import Card from '../../components/ui/Card.jsx';
import DataTable from '../../components/ui/DataTable.jsx';
import Notice from '../../components/ui/Notice.jsx';
import { importErrorCodes } from '../../constants/preview.js';

const lineColumns = [
  { key: 'posicao', label: 'Posição' },
  { key: 'situacao', label: 'Situação' },
  { key: 'erros', label: 'Erros' },
];

const errorColumns = [
  { key: 'id', label: 'Código' },
  { key: 'explicacao', label: 'Significado' },
];

export default function ImportacoesPage() {
  return (
    <div className="stack">
      <Notice>
        A importação acontece em etapas: o lote é enviado e fica pendente de
        confirmação, as linhas são revisadas e nada é gravado até a confirmação.
      </Notice>
      <div className="two-columns">
        <Card
          title="1. Enviar lote"
          description="Linhas com campo, endereço, classificação, município, consultório, especialidade e capacidades."
          action={<PendingButton>Enviar lote</PendingButton>}
        >
          <p className="muted">
            Resultado esperado: situação pendente de confirmação, com o total de
            linhas válidas e inválidas.
          </p>
        </Card>
        <Card
          title="3. Confirmar"
          description="Cria os campos e consultórios das linhas válidas."
          action={<PendingButton>Confirmar importação</PendingButton>}
        >
          <p className="muted">
            Resultado esperado: situação confirmada, com a contagem de campos
            criados, consultórios criados e linhas ignoradas.
          </p>
        </Card>
      </div>
      <Card
        title="2. Revisar linhas"
        description="Cada linha aparece como válida ou inválida, com seus códigos de erro."
      >
        <DataTable
          caption="Linhas do lote importado"
          columns={lineColumns}
          emptyTitle="Nenhum lote enviado"
          emptyDescription="Depois de enviar um lote, a situação de cada linha aparecerá aqui."
        />
      </Card>
      <Card
        title="Códigos de erro"
        description="Motivos pelos quais uma linha é marcada como inválida."
      >
        <DataTable
          caption="Códigos de erro da importação"
          columns={errorColumns}
          rows={importErrorCodes}
        />
      </Card>
    </div>
  );
}
