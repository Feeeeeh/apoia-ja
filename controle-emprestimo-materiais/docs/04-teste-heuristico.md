# Teste heurístico

Exercício 02 · Passo 5. Uma avaliação por tela, com 5 heurísticas de Nielsen.

> **Como ler este documento:** esta revisão foi feita sobre o desenho e o código das telas, sem uso real do aplicativo no navegador. A coluna "Confirmado" fica vazia de propósito: marque cada linha depois de testar na tela. Se a lista de 5 heurísticas da sua turma for outra, troque as linhas pelas que o professor indicou.

Heurísticas aplicadas:

1. Visibilidade do estado do sistema
2. Prevenção de erros
3. Consistência e padrões
4. Reconhecimento em vez de memorização
5. Ajuda para reconhecer, diagnosticar e corrigir erros

## Tela 1: Materiais

| Heurística | O que o projeto faz | Confirmado |
|---|---|---|
| 1. Visibilidade | Mensagem de carregamento, selo de situação em cada cartão, aviso após excluir | [ ] |
| 2. Prevenção de erros | Botão Excluir desabilitado para material emprestado, confirmação antes de excluir | [ ] |
| 3. Consistência | Mesmos botões, selos e cartões das outras telas | [ ] |
| 4. Reconhecimento | Filtros visíveis com a opção ativa marcada, campo de busca sempre à vista | [ ] |
| 5. Erros | Falha de rede mostra mensagem em português e botão "Tentar novamente" | [ ] |

## Tela 2: Cadastro

| Heurística | O que o projeto faz | Confirmado |
|---|---|---|
| 1. Visibilidade | Botão mostra "Aguarde..." ao enviar, aviso de sucesso após salvar | [ ] |
| 2. Prevenção de erros | Validação de formato antes de enviar, unicidade do código garantida pelo banco | [ ] |
| 3. Consistência | Campos e botões iguais aos da tela 3 | [ ] |
| 4. Reconhecimento | Estado de conservação e tipo em listas, dica no campo de contato | [ ] |
| 5. Erros | Mensagem junto ao campo, foco no primeiro campo com erro, código duplicado explicado | [ ] |

## Tela 3: Novo empréstimo

| Heurística | O que o projeto faz | Confirmado |
|---|---|---|
| 1. Visibilidade | Aviso de sucesso diz qual material, para quem e até quando | [ ] |
| 2. Prevenção de erros | A lista só traz materiais disponíveis, o calendário não aceita data passada, o banco recusa material já emprestado | [ ] |
| 3. Consistência | Mesmo padrão de formulário da tela 2 | [ ] |
| 4. Reconhecimento | Seleção por lista com nome e código, sem digitar ids | [ ] |
| 5. Erros | Vazio explica o que falta e leva à tela certa, erro do banco aparece em português | [ ] |

## Tela 4: Empréstimos em aberto

| Heurística | O que o projeto faz | Confirmado |
|---|---|---|
| 1. Visibilidade | Contadores nos filtros, selo Atrasado ou No prazo, aviso após devolver | [ ] |
| 2. Prevenção de erros | Devolução em 2 passos (botão e confirmação), o mesmo empréstimo não é devolvido duas vezes | [ ] |
| 3. Consistência | Cartões e selos iguais aos da tela 1 | [ ] |
| 4. Reconhecimento | Cada cartão traz material, solicitante e prazo, sem precisar abrir outra tela | [ ] |
| 5. Erros | Mensagem no próprio cartão quando a devolução falha | [ ] |

## Problemas conhecidos

Itens que a revisão encontrou e que ficaram como estão nesta versão:

| Problema | Gravidade | Situação |
|---|---|---|
| A exclusão de material usa a caixa de confirmação do navegador, que não segue o visual do sistema | Baixa | Mantido por simplicidade |
| Não há como desfazer uma devolução | Média | Fora do escopo do MVP |
| Não há login, então qualquer pessoa com o link altera os dados | Alta | Pendência registrada no README (RNF05) |
| Materiais com histórico de empréstimos não podem ser excluídos, para preservar o histórico | Baixa | Decisão de projeto, explicada no modelo de dados |
