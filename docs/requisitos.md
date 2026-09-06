# Ler os materiais antes de implementar

A [especificação dos alunos](../Especificao_campos.pdf) define o trabalho da
disciplina. A [matriz de proficiência](../Matriz_Proficiencia_Item4_Preceptoria_Campos_Praticas%20%281%29.pdf)
apresenta uma proposta para discussão com o GT. Os arquivos de `prototipo/`,
inclusive seus anexos, permanecem como referências originais.

## Diferenças que afetam a modelagem

- **Capacidade:** RF-12 e RF-13 pedem mínimo e máximo por consultório. RF-05a
  acrescenta o tipo de atendimento dentro da especialidade. Uma coluna de
  capacidade total do campo não substitui essas dimensões.
- **Valores de referência:** os números de alunos por especialidade do protótipo
  não coincidem com todos os exemplos da especificação. Foram retirados da base
  React. Não use esses números como limites fixos.
- **Relacionamento:** o protótipo fala em “parceiro” e “comum”; RF-03 pede
  Inflexível, Flexível ou Parceiro. Os filtros aguardam o cadastro definido pelo grupo.
- **Score:** RF-08 deixa metodologia e justificativa a cargo de cada equipe.
  Os pesos e níveis da matriz são uma proposta de referência, não uma fórmula
  já adotada por esta aplicação. RF-04 exige considerar campo e especialidade,
  podendo também variar por dia da semana.
- **Aceitabilidade:** RF-23 pede sinalização para condições intermediárias;
  RF-24 exige impedir o registro de condições Inaceitáveis. Essa validação
  pertence à API e depende da configuração, não de um botão desabilitado na tela.
- **Avaliações:** nota acadêmica do aluno e avaliação que ele faz do campo ou
  preceptor são registros distintos. O NPS visual do protótipo não cobre todos
  os indicadores propostos na matriz.

## Responsabilidade dos grupos

O frontend não define banco, entidades completas, pesos, faixas, cálculo de custo,
limites de capacidade, regras municipais ou alocação. Também não resolve
autenticação, auditoria, importação, histórico ou acesso a dados pessoais.

Itens marcados “EM DEFINIÇÃO” devem ser tratados como decisões em aberto,
registradas e configuráveis. A matriz inclui elementos de experiência educacional
e competência que ajudam a discutir o problema, sem ampliar automaticamente o
escopo obrigatório de desenvolvimento.

O sistema apoia a decisão humana. Alocação automática é desafio bônus; chamada
e geolocalização de ponto ficam fora do escopo obrigatório desta fase, conforme
o documento de requisitos.
