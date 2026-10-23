# Conectar a API da equipe

O frontend não pressupõe linguagem, banco, autenticação ou formato de paginação.
As páginas começam vazias e não disparam requisições. A conexão é feita
explicitamente pela equipe, conforme os contratos que ela desenvolver.

## 1. Configurar o endereço

Copie `.env.example` para `.env` pelo editor ou pelo terminal:

```powershell
Copy-Item .env.example .env
```

No macOS/Linux, use `cp .env.example .env`.

```dotenv
VITE_API_BASE_URL=http://localhost:3000/api
```

Reinicie `npm run dev` depois de alterar o arquivo. Em produção, essas variáveis
são incorporadas durante `npm run build`; alterá-las no servidor depois do build
não muda os arquivos já gerados. Variáveis `VITE_*` são públicas no navegador:
nunca coloque senhas, segredos ou chaves privadas nelas.

Se frontend e API estiverem em origens diferentes, configure o CORS na API para
aceitar a origem do frontend, como `http://localhost:5173`. O cliente não usa
`no-cors`, pois isso impediria ler a resposta. Também é possível usar uma URL
relativa como `/api`, desde que a hospedagem encaminhe esse caminho ao backend.

## 2. Criar um serviço de domínio

O cliente compartilhado está em `src/services/api.js`. Ele recebe um caminho
relativo à URL base e as opções de `fetch`, mais a opção `json` para serializar
um corpo JSON. Não prefixe o caminho novamente com `/api` se a base já contém isso.

Exemplo de arquivo **a ser criado pela equipe**, `src/services/campos.js`:

```js
import { api } from './api.js';

export function listarCampos({ signal } = {}) {
  return api('/campos', { signal });
}
```

Esse exemplo supõe que `GET /campos` devolve um array. Se a API devolver
`{ items, total }`, adapte a resposta nesse serviço ou no hook que o consome,
mantendo os componentes livres de detalhes do transporte.

Outras formas de usar o cliente:

```js
const resultado = await api('/campos', {
  method: 'POST',
  json: { nome: 'Nome informado no formulário' },
});

await api('/importacoes', {
  method: 'POST',
  json: {
    linhas: [
      {
        campo: 'Nome do campo',
        endereco: 'Endereço do campo',
        classificacao: 'Classificação do campo',
        municipio: 'Nome do município',
        consultorio: '1',
        especialidade: 'Nome da especialidade',
        capacidadeMin: 1,
        capacidadeMax: 4,
      },
    ],
  },
});
```

`json` e `body` são alternativas; envie apenas uma. A importação do contrato
comum recebe JSON com a lista `linhas`, sem upload de arquivo. Se o grupo
preferir enviar um arquivo com `FormData`, não defina `Content-Type`
manualmente: o navegador precisa gerar o separador do upload. Use `URLSearchParams` para montar filtros e `encodeURIComponent` para segmentos
dinâmicos de caminho.

O retorno é o corpo da resposta, sem conversões de entidades ou extração de
envelopes: JSON vira objeto/array, texto permanece texto e corpo vazio retorna
`null`. Um corpo anunciado como JSON mas malformado em uma resposta de sucesso
gera `SyntaxError`, indicando quebra de contrato.

Erros HTTP geram `ApiError`, com `status` e `data`. Se o corpo JSON contiver uma
`message` de texto, ela será usada como mensagem; outros formatos, como
`{ errors: [...] }`, ficam disponíveis em `data` para o grupo interpretar.
Falhas de rede e cancelamentos conservam os erros de `fetch`.

## 3. Ligar a resposta à página

Em `src/pages/campos/CamposPage.jsx`, a tabela está preparada para receber `rows`.
Cada item precisa ter uma chave `id` estável e as propriedades indicadas em
`columns`. As chaves atuais são rótulos de apresentação, não um contrato de API.

O grupo pode criar `src/hooks/useCampos.js` para carregar e adaptar os dados.
Ao fazer isso, trate separadamente:

- **Carregando:** apresente um estado de carregamento antes de concluir a busca.
- **Erro:** mostre uma mensagem e permita tentar novamente.
- **Vazio:** use o estado vazio somente depois de uma busca bem-sucedida sem registros.
- **Dados:** passe os registros adaptados à tabela.

Use um `AbortController` e cancele a requisição na limpeza do efeito. Não exiba
cancelamentos como erro e não substitua erros de rede por uma lista vazia. O
`StrictMode` está ativo no desenvolvimento e pode montar efeitos novamente para
ajudar a encontrar problemas de limpeza.

Só habilite os filtros e substitua `PendingButton` por `Button` quando os
respectivos handlers estiverem conectados. `FilterBar` usa um `fieldset disabled`
porque seus filtros ainda são apenas a estrutura visual; remova esse bloqueio
quando implementar o fluxo completo.

## 4. Definir autenticação

`PreviewProvider` e `usePreviewProfile` guardam somente a escolha visual de perfil
em memória. Eles não guardam token, não representam sessão e não protegem rotas.
O perfil volta ao padrão quando a página é recarregada.

Ao implementar login, substitua esse estado pela sessão definida pelo grupo e
adapte a tela inicial e o layout. O cliente aceita `headers` e `credentials`,
sem decidir onde armazenar credenciais.

Com o contrato comum, `POST /auth/login` recebe `{ email, senha }` e devolve
`{ token }`. Envie o token em todas as chamadas protegidas, no cabeçalho
`Authorization: Bearer <token>`:

```js
await api('/campos', {
  headers: { Authorization: `Bearer ${token}` },
});
```

A API responde **401** quando o token falta, é inválido ou expirou, e **403**
quando o token é válido, mas o papel não tem permissão (por exemplo, um usuário
CONSULTA tentando criar ou apagar). Trate os dois casos de forma diferente: o
401 leva ao login, o 403 mostra uma mensagem de acesso negado.

Esconder botões no frontend melhora a experiência, mas não substitui a
autorização da API: toda permissão precisa ser verificada no servidor. O mesmo
vale para dados restritos, como a região de moradia do aluno.

## Telas e recursos

O prefixo `/api` fica na URL base. As rotas abaixo seguem a divisão das entregas.

### Contrato comum (Entregas 2 a 5)

Estas rotas fazem parte do contrato comum da disciplina. Códigos esperados:
201 na criação, 200 na leitura e na alteração, 204 na remoção, 400 para dados
inválidos, 404 para recurso inexistente e 409 ao apagar um campo que ainda tem
consultórios.

| Tela               | Rotas                                                                                                                                                                              | Observações                                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Entrada            | `POST /auth/login`, `POST /usuarios`, `GET /usuarios`                                                                                                                              | Login devolve `{ token }`. Criar e listar usuários é só para ADMIN. CONSULTA só faz GET.                           |
| Campos             | `POST /campos`, `GET /campos`, `GET /campos/:id`, `PATCH /campos/:id`, `DELETE /campos/:id`                                                                                        | Campos: nome, endereco, classificacao, municipioId. Apagar com consultórios retorna 409.                           |
| Consultórios       | `POST /consultorios`, `GET /consultorios`, `GET /consultorios?campoId=...`, `GET /consultorios/:id`, `PATCH /consultorios/:id`, `DELETE /consultorios/:id`                         | Campos: numero, campoId, especialidadeId, capacidadeMin, capacidadeMax.                                            |
| Listas de apoio    | `GET /municipios`, `GET /especialidades`, `GET /health`                                                                                                                            | Alimentam os filtros e os formulários. `/health` confere se a API está no ar.                                      |
| Alunos e alocações | `POST /alunos`, `GET /alunos`, `GET /alunos/:id`, `DELETE /alunos/:id`, `POST /alocacoes`, `GET /alocacoes?consultorioId=&alunoId=`, `GET /alocacoes/:id`, `DELETE /alocacoes/:id` | Aluno: nome, matricula. Alocação: alunoId, consultorioId. Alocação INACEITAVEL retorna 400 `OCUPACAO_INACEITAVEL`. |
| Ocupação           | `GET /consultorios/:id/ocupacao`                                                                                                                                                   | Devolve classificação IDEAL, ACEITAVEL ou INACEITAVEL e a lista de alertas, cada um com sua evidência.             |
| Faixas de ocupação | `GET /faixas`, `PATCH /faixas/:id`                                                                                                                                                 | Uma faixa por especialidade, guardada no banco, com `ideal` e `maximoAceitavel`.                                   |
| Importação         | `POST /importacoes`, `GET /importacoes/:id`, `POST /importacoes/:id/confirmar`                                                                                                     | Envio em JSON com `linhas`. Fica PENDENTE_CONFIRMACAO até a confirmação, que cria campos e consultórios.           |

### Funcionalidades extras (escolha do grupo)

Estas são sugestões extraídas do protótipo, **não endpoints existentes nem um
contrato obrigatório**. O grupo escolhe quais implementar e deve documentá-las.

| Tela         | Recurso sugerido                            | Trabalho do grupo                                   |
| ------------ | ------------------------------------------- | --------------------------------------------------- |
| Painel       | `GET /indicadores`                          | Consolidar os indicadores                           |
| Preceptores  | `GET /preceptores` e `GET /preceptores/:id` | Listagem e qualificação                             |
| Vínculos     | `GET /vinculos`                             | Períodos, alterações e histórico                    |
| Contratos    | `GET /contratos`                            | Modelos, vigência e valores                         |
| Distribuição | `GET /distribuicao`                         | Consultórios, especialidades e tipos de atendimento |
| Simulador    | `POST /simulacoes`                          | Calcular os campos escolhidos pelo usuário          |
| Mapa         | `GET /campos/geo`                           | Coordenadas e biblioteca de mapa                    |
| Avaliações   | `GET /avaliacoes`                           | Avaliações de campo e preceptor                     |

As rotas `/campos/exemplo` e `/preceptores/exemplo` são fichas vazias. Quando
houver dados reais, defina rotas com identificadores e atualize os links da tabela.
Os serviços, os formulários de cadastro, a importação e as regras de domínio
continuam como parte da atividade.
