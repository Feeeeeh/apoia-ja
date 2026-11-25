# Wireframes lo-fi

Exercício 02 · Passo 2. Os wireframes mostram fluxo e organização, não visual. Larguras de referência: celular (375 px) e desktop.

## Estrutura comum

```
+--------------------------------------------+
| Empréstimo de Materiais                    |
| [Materiais] [Cadastro] [Novo empr.] [Aberto]|
+--------------------------------------------+
| (conteúdo da tela)                         |
+--------------------------------------------+
```

No celular o menu quebra em 2 linhas de 2 botões.

## Tela 1: Materiais

```
Materiais
Buscar por nome ou código
[______________________________]
[Todos] [Disponíveis] [Emprestados]

+------------------+  +------------------+
| Projetor Epson   |  | Notebook Dell    |
| PAT-0001  (Disp.)|  | PAT-0002 (Empr.) |
| Projetor. Bom    |  | Com Juliana até  |
| [Editar][Excluir]|  | 30/11  (Atrasado)|
+------------------+  | [Editar][Excluir]|
                      +------------------+
```

Estados: carregando, vazio (nenhum cadastrado, ou nenhum resultado na busca), erro com "Tentar novamente", sucesso (lista).

## Tela 2: Cadastro

```
Cadastro
[ Material ] [ Solicitante ]

Nome do material      [____________]
Código de patrimônio  [____________]
Categoria             [____________]
Estado de conservação [Bom        v]

[Cadastrar material]
```

A aba Solicitante tem nome, tipo (aluno, professor ou funcionário) e contato. No modo edição, as abas somem e aparece "Voltar para a lista".

## Tela 3: Novo empréstimo

```
Novo empréstimo
Material disponível   [Selecione...  v]
Solicitante           [Selecione...  v]
Prazo de devolução    [dd/mm/aaaa     ]

[Registrar empréstimo]
```

Estados: carregando, erro, vazio (sem solicitante ou sem material disponível, com botão para a tela certa), formulário.

## Tela 4: Empréstimos em aberto

```
Empréstimos em aberto
[Todos (3)] [Atrasados (1)]

+------------------+  +------------------+
| Projetor Epson   |  | Cabo HDMI        |
| Solicitante: ... |  | Solicitante: ... |
| Prazo: 25/11     |  | Prazo: 02/12     |
| (Atrasado)       |  | (No prazo)       |
| [Reg. devolução] |  | [Reg. devolução] |
+------------------+  +------------------+
```

Ao clicar em "Registrar devolução", o cartão mostra o campo de observação (opcional) e os botões Confirmar e Cancelar.
