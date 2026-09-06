# Campos de Estágio

Base React para os projetos da disciplina de Desenvolvimento de APIs.
O visual parte do protótipo da Coordenação de Medicina da FAMINAS.

O objetivo é começar com as telas organizadas e concentrar o trabalho da equipe
na construção da API. O projeto abre sem backend, sem banco de dados e sem credenciais.

## Começar

1. Faça um **fork** deste repositório no GitHub.
2. Clone o seu fork e abra a pasta no terminal.
3. Use **Node.js 24** (a versão também está em `.nvmrc`).
4. Instale as dependências e inicie o projeto:

```bash
npm ci
npm run dev
```

Abra o endereço informado pelo Vite, normalmente `http://localhost:5173`.
Na tela inicial, escolha um perfil e clique em **Explorar a prévia**.

Não é preciso criar um `.env` para conhecer as telas. Quando a API da equipe
estiver pronta, copie `.env.example` para `.env`, configure `VITE_API_BASE_URL`
e siga o [guia de integração](docs/integracao-api.md).

## O que vem pronto

- Navegação por URL, menu responsivo e página de endereço não encontrado.
- Painel, mapa, campos, preceptores, vínculos, contratos, distribuição,
  simulador, avaliações e fichas de exemplo.
- Componentes de botão, formulário, cartão, tabela e estado vazio.
- Fontes, imagens e cores locais, preservando a identidade do protótipo.
- Cliente HTTP com `fetch`, configuração de ambiente, lint e formatação.
- Testes do transporte HTTP e workflow de verificação no GitHub.

A seleção de perfil é apenas visual. Não existe login real, autorização,
persistência ou chamada automática a uma API. Filtros, cadastros, importação,
exportação, cálculo de score e simulação serão implementados pela equipe.
Os controles dessas ações ficam desabilitados na prévia; as abas das fichas
apenas indicam seções previstas.

**Configurar a URL não preenche as telas automaticamente.** O grupo precisa
definir os endpoints, criar seus serviços e ligar os dados aos componentes.

## Organização

```text
src/
  assets/       imagens e fontes
  components/
    ui/         componentes visuais reutilizáveis
    shared/     composições usadas por mais de uma página
  config/       variáveis de ambiente
  constants/    rotas e rótulos de apresentação
  contexts/     estado compartilhado da prévia
  hooks/        acesso ao estado e futuros hooks da aplicação
  layouts/      menu e estrutura comum das páginas
  pages/        telas agrupadas por assunto
  services/     transporte HTTP e futuros serviços da API
  styles/       tokens, estilos globais, componentes e layouts
  App.jsx       declaração das rotas
  main.jsx      entrada da aplicação
tests/          testes do cliente HTTP
docs/           arquitetura, integração e leitura dos requisitos
prototipo/      referência original, fora do bundle da aplicação
```

Uma alteração em uma tela começa em `pages/`. Se houver repetição real,
extraia um componente. Chamadas HTTP ficam em `services/`; comportamento de
React que precisa ser reutilizado pode virar um hook. Não crie camadas ou
abstrações antes de ter uma necessidade concreta.

## Comandos

| Comando                | Uso                                                   |
| ---------------------- | ----------------------------------------------------- |
| `npm run dev`          | Desenvolvimento com atualização automática            |
| `npm run build`        | Gera a aplicação estática em `dist/`                  |
| `npm run preview`      | Confere o build localmente                            |
| `npm run lint`         | Verifica JavaScript, JSX e regras dos hooks           |
| `npm run format`       | Formata o código e a documentação                     |
| `npm run format:check` | Confere a formatação sem alterar arquivos             |
| `npm test`             | Testa o cliente HTTP com um servidor local temporário |
| `npm run check`        | Executa lint, formatação, testes e build              |

O servidor dos testes existe só durante a execução, em uma porta livre.
Ele não é uma API de exemplo para a atividade.

No Windows, encerre `npm run dev` antes de reinstalar dependências com `npm ci`.
O servidor aberto pode manter arquivos nativos em uso e causar o erro `EPERM`.

## Trabalhar em equipe

Crie uma branch para cada mudança, combine os contratos da API antes de conectar
as telas e mantenha o `package-lock.json` versionado. Use `npm ci` para reproduzir
as versões do repositório. Antes de abrir um pull request, rode `npm run check`.

Prefira commits pequenos que expliquem a mudança, por exemplo
“Conecta a listagem de campos à API”. Evite misturar formatação geral e uma
funcionalidade no mesmo commit.

## Referências

- [Arquitetura da base](docs/arquitetura.md)
- [Como conectar a API](docs/integracao-api.md)
- [Pontos de atenção nos requisitos](docs/requisitos.md)
- [Especificação para os alunos](Especificao_campos.pdf)
- [Matriz de proficiência](Matriz_Proficiencia_Item4_Preceptoria_Campos_Praticas%20%281%29.pdf)
- Documentação das ferramentas: [React](https://react.dev/learn),
  [Vite](https://vite.dev/guide/) e [React Router](https://reactrouter.com/start/declarative/installation).

## Hospedagem

Publique o conteúdo de `dist/` em uma hospedagem estática e configure os caminhos
da aplicação para retornarem `index.html`. Isso permite abrir ou atualizar URLs
como `/campos` diretamente. O servidor da API deve responder erros de API como
API; não redirecione `/api/*` para o HTML do frontend.

O projeto usa caminhos a partir da raiz do domínio. Hospedar em subpastas, como
`/nome-do-repo/` no GitHub Pages, exige configurar `base` no Vite e `basename`
no `BrowserRouter`, além de tratar o fallback das rotas. A configuração inicial
não publica um site automaticamente.

Os logos e materiais institucionais foram mantidos como referência da disciplina.
Este repositório não atribui uma nova licença a esses materiais.
