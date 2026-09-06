# Base React para a disciplina

O projeto transforma as telas de `prototipo/` em React. Serve como ponto de
partida para os grupos desenvolverem suas APIs, sem antecipar a solução do trabalho.

## Escolhas

React, Vite e JavaScript com módulos ES. React Router cuida das URLs e CSS comum
preserva a identidade visual. É uma aplicação pequena o suficiente para dispensar
uma biblioteca de estado global, um framework full-stack ou um kit de componentes.
TypeScript pode ser adotado por cada grupo conforme a familiaridade da equipe.

- `pages`: composição das telas, com um diretório por assunto.
- `components`: controles, cartões, tabelas e estados vazios reutilizáveis.
- `layouts`: estrutura compartilhada, menu e cabeçalho.
- `constants`: caminhos, opções de apresentação e rótulos; nunca pesos ou limites de negócio.
- `assets`: imagens e fontes locais do protótipo.
- `contexts` e `hooks`: perfil selecionado para a prévia, mantido somente em memória.
- `services`: transporte HTTP independente de React.
- `config`: leitura das variáveis de ambiente.
- `styles`: tokens, estilos globais e composição das páginas.

As páginas mostram estados vazios. Botões de cadastro, filtros, importação e
simulação ficam desabilitados até a integração. A navegação e a seleção do tipo
de avaliação continuam disponíveis. A prévia não autentica nem restringe acesso.

O cliente HTTP recebe a URL base e usa `fetch`. Ele trata JSON, texto, respostas
vazias e erros HTTP, sem impor envelopes, entidades ou estratégia de autenticação.
Configurar a URL não conecta automaticamente as páginas: o grupo implementará os
serviços de domínio e ligará suas respostas à interface.

## Materiais de referência

Os originais ficam preservados. A especificação dos alunos orienta o escopo;
a matriz de proficiência é uma proposta para discussão. Diferenças em capacidade,
classificação e score devem ser resolvidas pelos grupos com os requisitos, sem
copiar os números do protótipo para constantes executáveis.

## Verificação

Instalação pelo lockfile, lint, formatação e build. Testes do cliente HTTP com um
servidor local de teste. Conferência das rotas, estados vazios e layout responsivo
no navegador. Nenhuma API de negócio é necessária para essas verificações.
