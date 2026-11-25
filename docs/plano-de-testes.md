# Plano de testes do MVP

Baseado nos critérios de aceite de `docs/requisitos.md` e na Aula 05 — Testes e Validação.

> **Importante:** os casos abaixo são um roteiro de execução. Eles não estão marcados como aprovados porque dependem de executar a aplicação conectada a um projeto Supabase real.

## Massa de dados

Execute `supabase/seed.sql` depois de criar as tabelas. A massa inicial contém três materiais e dois solicitantes. Para testar empréstimos, use um material disponível.

## Casos funcionais

| ID | Cenário | Passos | Resultado esperado | Status |
|---|---|---|---|---|
| CT01 | Listar materiais | Abrir Materiais | Os materiais cadastrados aparecem com patrimônio e situação | Pendente |
| CT02 | Buscar material | Pesquisar parte do nome e depois o código | A lista é filtrada corretamente | Pendente |
| CT03 | Filtrar situação | Selecionar Disponíveis e Emprestados | Cada filtro mostra apenas os itens correspondentes | Pendente |
| CT04 | Validar cadastro | Enviar material sem nome ou sem código | O sistema impede o envio e informa o campo | Pendente |
| CT05 | Código duplicado | Cadastrar material com patrimônio já existente | O sistema informa que o código já está em uso | Pendente |
| CT06 | Registrar empréstimo | Selecionar material disponível, solicitante e prazo futuro | O empréstimo é salvo e o material passa para Emprestado | Pendente |
| CT07 | Impedir prazo passado | Tentar registrar empréstimo com prazo anterior a hoje | O formulário impede o envio | Pendente |
| CT08 | Impedir empréstimo duplicado | Tentar emprestar novamente um material já emprestado | O material não pode ser emprestado novamente | Pendente |
| CT09 | Registrar devolução | Confirmar a devolução de um empréstimo aberto | O empréstimo sai da lista de abertos e o material volta a Disponível | Pendente |
| CT10 | Identificar atraso | Criar empréstimo com prazo anterior a hoje (em ambiente de teste) | O cartão aparece como Atrasado e no filtro correspondente | Pendente |
| CT11 | Persistência | Cadastrar um material, recarregar a página | O registro continua no banco e na listagem | Pendente |
| CT12 | Exclusão relacionada | Tentar excluir material que possui histórico de empréstimo | O banco bloqueia a exclusão e o sistema apresenta mensagem | Pendente |

## Integração ponta a ponta

**Fluxo principal:** interface → Supabase SDK → API/banco → resposta → atualização da interface.

1. Cadastrar ou selecionar um material disponível.
2. Selecionar um solicitante e informar o prazo.
3. Registrar o empréstimo.
4. Conferir o registro na tela Empréstimos em aberto.
5. Conferir no Supabase que o empréstimo foi gravado e a situação do material mudou.
6. Registrar a devolução.
7. Conferir que `devolvido_em` foi preenchido e que o material voltou a Disponível.

## Usabilidade e responsividade

| Teste | Procedimento | Critério |
|---|---|---|
| Usabilidade | Pedir a uma pessoa que não conhece o sistema para registrar um empréstimo sem explicar os passos | Concluir sem ajuda e, como meta do requisito, em até 60 segundos |
| Celular | Testar em largura de 360–375 px | Não deve haver rolagem horizontal; botões e campos devem continuar utilizáveis |
| Tablet | Testar em largura de 768 px | Conteúdo deve se reorganizar sem sobreposição |
| Desktop | Testar em largura de 1280 px | Lista deve aproveitar o espaço disponível |

## Registro da execução

Preencha durante os testes reais:

| Data | Navegador/dispositivo | Casos executados | Aprovados | Falhas / observações |
|---|---|---|---|---|
| — | — | — | — | Ainda não executado |

## Limitações conhecidas

- Não há autenticação. As políticas RLS atuais permitem acesso anônimo às operações; use apenas dados fictícios de demonstração e não publique esta configuração para uso real.
- Não há teste automatizado de navegador configurado neste repositório.
- A avaliação heurística existente é uma revisão do desenho e do código, não uma sessão de teste com usuários.
- Os critérios só devem ser marcados como aprovados depois da execução.
