# Roteiro de apresentação — até 5 minutos

## Objetivo

Apresentar o problema, mostrar o fluxo principal funcionando e explicar brevemente as decisões técnicas. Não tente demonstrar todas as telas em profundidade.

## Demonstração cronometrada

| Tempo | O que falar / mostrar |
|---|---|
| 0:00–0:35 | **Problema:** o controle manual em cadernos ou planilhas dificulta saber onde está cada material, quem o retirou e quando deve devolver. |
| 0:35–1:00 | **Solução:** apresentar o Controle de Empréstimo de Materiais. O responsável cadastra materiais e solicitantes, registra empréstimos e acompanha devoluções e atrasos. |
| 1:00–1:35 | **Materiais:** mostrar a lista, a busca por nome/código e os filtros Disponíveis e Emprestados. Apontar que o cartão mostra patrimônio, conservação e situação. |
| 1:35–2:35 | **Novo empréstimo:** selecionar um material disponível, um solicitante e um prazo futuro. Registrar. Destacar a mensagem de confirmação. |
| 2:35–3:25 | **Em aberto:** mostrar o empréstimo recém-criado, quem está com o material e o prazo. Mostrar o filtro de atrasados, se houver um empréstimo vencido no conjunto de demonstração. |
| 3:25–4:00 | **Devolução:** abrir a confirmação, adicionar uma observação opcional e registrar a devolução. Voltar à lista de materiais para mostrar que o item está disponível novamente. |
| 4:00–4:35 | **Como funciona:** React + TypeScript no front-end; Supabase/PostgreSQL no back-end. O banco aplica regras para impedir empréstimo de item indisponível, duplicidade de empréstimo aberto e prazo passado. |
| 4:35–5:00 | **Limitações e próximos passos:** informar que a versão de apresentação ainda não tem login e que autenticação, testes com usuários e publicação são etapas pendentes. |

## Fala sugerida

“Nosso projeto resolve um problema comum em laboratórios: o controle de materiais emprestados costuma ficar em planilhas ou registros manuais. Isso dificulta identificar rapidamente quem está com cada item e quais devoluções estão atrasadas.

A solução é um sistema web para o responsável pelo laboratório. Aqui temos o cadastro e a consulta dos materiais, com busca por nome ou patrimônio e filtros por disponibilidade.

Agora vou registrar um empréstimo. O sistema só apresenta materiais disponíveis, exige solicitante e prazo e não permite uma data anterior à de hoje. Depois de salvar, o empréstimo aparece na tela de itens em aberto.

Nessa tela conseguimos identificar o responsável, o prazo e os atrasos. Ao registrar a devolução, o material volta automaticamente para a situação disponível.

Tecnicamente, a interface foi desenvolvida em React e TypeScript, e os dados ficam no Supabase, usando PostgreSQL. Algumas regras importantes também são protegidas no banco, e não apenas na interface.

Esta é a versão MVP: ela cobre o fluxo essencial de cadastro, empréstimo, acompanhamento e devolução. Como próximos passos, ficam a autenticação, a validação com usuários e a publicação para uso.”

## Preparação antes de apresentar

- [ ] Abrir o sistema e confirmar que a conexão com o Supabase está funcionando.
- [ ] Deixar 3 materiais e 2 solicitantes cadastrados.
- [ ] Confirmar que pelo menos 1 material está disponível para o empréstimo demonstrado.
- [ ] Usar um prazo futuro para o empréstimo da apresentação.
- [ ] Testar o fluxo completo de empréstimo e devolução antes da aula.
- [ ] Fechar abas e janelas que não serão usadas.
- [ ] Ter capturas de tela como plano B caso a internet falhe.

## Dica para não estourar o tempo

Faça apenas um ciclo completo: consultar material → emprestar → acompanhar → devolver. Não gaste tempo cadastrando muitos registros durante a apresentação.
