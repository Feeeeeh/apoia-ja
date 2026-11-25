# 📦 Controle de Empréstimo de Materiais

Sistema web para controlar o empréstimo e a devolução de materiais de laboratórios e salas de aula. O responsável pelo laboratório vê em segundos o que está disponível, o que está emprestado, com quem e quais prazos já venceram.

> **Status:** MVP implementado no código. A execução integrada ainda depende de configurar um projeto Supabase e executar os testes documentados. Não considere os critérios aprovados antes de testá-los.

Projeto acadêmico do Senac · UC6 · Prototipação Rápida de Aplicações com IA.

## Stack

| Camada | Tecnologia |
|---|---|
| Front-end | React 18, TypeScript, Tailwind CSS, Vite |
| Back-end | Supabase (Postgres, RLS e `@supabase/supabase-js`) |
| Deploy | Vercel ou Netlify |

## Telas

| # | Tela | O que faz |
|---|---|---|
| 1 | Materiais | Lista, busca por nome ou código, filtro por situação, edição e exclusão |
| 2 | Cadastro | Formulários de material e de solicitante, com validação |
| 3 | Novo empréstimo | Escolhe material disponível, solicitante e prazo |
| 4 | Em aberto | Lista os empréstimos em aberto, destaca atrasos e registra devoluções |

Todas as telas tratam os 4 estados: **carregando**, **vazio**, **sucesso** e **erro**.

### Prints

Os prints ainda precisam ser tirados, porque dependem do app rodando com o seu Supabase. Salve em `docs/prints/` (375 px, 768 px e 1280 px, se quiser mostrar a responsividade) e troque esta seção por:

```markdown
![Materiais](docs/prints/01-materiais.png)
![Cadastro](docs/prints/02-cadastro.png)
![Novo empréstimo](docs/prints/03-novo-emprestimo.png)
![Em aberto](docs/prints/04-em-aberto.png)
```

## Como rodar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie um projeto no [Supabase](https://supabase.com). No **SQL Editor**, rode `supabase/schema.sql` e depois, se quiser dados de exemplo, `supabase/seed.sql`.

3. Copie as variáveis de ambiente e preencha com a URL e a chave `anon` do projeto (Project Settings, API):

   ```bash
   cp .env.example .env
   ```

4. Rode o projeto:

   ```bash
   npm run dev
   ```

Para publicar na Vercel ou na Netlify, cadastre `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` nas variáveis de ambiente do deploy. O comando de build é `npm run build` e a pasta de saída é `dist`.

**Deploy:** _(cole aqui o link depois de publicar)_

Outros comandos: `npm run build` gera a versão de produção e `npm run typecheck` confere os tipos.

## Apresentação e validação

- [Roteiro de apresentação de até 5 minutos](docs/roteiro-apresentacao.md)
- [Plano de testes do MVP](docs/plano-de-testes.md)

### Fluxo recomendado para a demonstração

1. Consultar materiais e mostrar busca/filtros.
2. Registrar um empréstimo de um material disponível.
3. Consultar o empréstimo em aberto.
4. Registrar a devolução e mostrar que o material voltou a ficar disponível.

A demonstração deve usar dados fictícios. Execute o fluxo completo antes da apresentação e mantenha capturas de tela como plano B.

## Estrutura

```
supabase/
  schema.sql            tabelas, regras, triggers e RLS
  seed.sql              dados de exemplo
src/
  lib/                  supabase.ts, tipos, datas e tradução de erros
  hooks/useConsulta.ts  carregando, erro e dados de uma consulta
  components/           Botao, Entrada, Cartao, Selo e demais componentes
  pages/                as 4 telas
docs/
  requisitos.md         documento de requisitos (Aula 1)
  01 a 04               mapa de telas, wireframes, tokens e teste heurístico (Aula 2)
  05-modelo-de-dados.md modelo, regras e RLS (Aula 3)
  roteiro-apresentacao.md demonstração de até 5 minutos
  plano-de-testes.md casos funcionais e integração (Aula 5)
```

Componentes base pedidos na Aula 4: Button = `Botao`, Input = `Entrada` (com `Selecao` para listas), Card = `Cartao` e Badge = `Selo`.

## Documentação

- [Requisitos](docs/requisitos.md): contexto, persona, RFs, RNFs, histórias, critérios de aceite e fora de escopo
- [Mapa de telas](docs/01-mapa-de-telas.md)
- [Wireframes lo-fi](docs/02-wireframes-lofi.md)
- [Tokens visuais](docs/03-tokens-visuais.md)
- [Teste heurístico](docs/04-teste-heuristico.md)
- [Modelo de dados e back-end](docs/05-modelo-de-dados.md)
- [Roteiro de apresentação](docs/roteiro-apresentacao.md)
- [Plano de testes](docs/plano-de-testes.md)

## Entregável da Aula 4

**Pronto no código:**

- [x] 4 componentes base reutilizáveis
- [x] 4 telas em React + Tailwind
- [x] Chamadas ao Supabase para listar, inserir, atualizar e excluir
- [x] Estados loading, empty, success e error em cada tela
- [x] Validação client-side nos formulários (formato no front, integridade no banco)
- [x] Layout responsivo com Tailwind (1, 2 e 3 colunas)
- [x] Navegação entre as 4 telas

**Antes de apresentar, ainda é necessário:**

- [ ] Criar o projeto Supabase, rodar o `schema.sql` e preencher o `.env`
- [ ] Executar os casos do [plano de testes](docs/plano-de-testes.md) com o Supabase configurado
- [ ] Testar a responsividade em 375 px, 768 px e 1280 px
- [ ] Tirar os prints das 4 telas e colocar na seção Prints
- [ ] Publicar na Vercel ou Netlify e colar o link
- [ ] Subir o repositório no Git
- [ ] Revisar o código e conseguir explicar o fluxo React → Supabase → PostgreSQL

## Decisões e limitações

- **Sem login.** O RNF05 (login e senha com hash) ainda não foi implementado, porque o slide da Aula 4 pede 4 telas e não inclui autenticação. As políticas de RLS liberam `anon`, então qualquer pessoa com o link altera os dados. Antes de usar de verdade, implemente o login com Supabase Auth e restrinja as políticas a `authenticated`.
- **Cadastro em uma tela só.** Material e solicitante dividem a tela 2, em duas abas, para manter as 4 telas pedidas.
- **Histórico (RF09) fora desta versão.** É Could e não tem tela.
- **Stack mudou em relação ao documento de requisitos original,** que citava C#. Os slides das Aulas 3 e 4 pedem React, Tailwind e Supabase, e o documento de requisitos foi atualizado.
