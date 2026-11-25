# Mapa de telas

Exercício 02 · Passo 1. O menu fica fixo no topo e aparece nas 4 telas, então qualquer tela chega a qualquer outra em 1 clique.

## Árvore de navegação

```
Menu (sempre visível)
├── 1. Materiais
│   └── Editar material (abre a tela 2 em modo edição)
├── 2. Cadastro
│   ├── Aba Material
│   └── Aba Solicitante
├── 3. Novo empréstimo
└── 4. Empréstimos em aberto
```

Profundidade máxima: 2 níveis (a edição é a única tela que está um nível abaixo do menu).

## Fluxos principais

| Fluxo | Caminho | Histórias |
|---|---|---|
| Emprestar um material | Cadastro (se faltar material ou solicitante) → Novo empréstimo → Em aberto | US01 |
| Devolver um material | Em aberto → Registrar devolução → Confirmar | US02 |
| Consultar um material | Materiais → buscar por nome ou código | US03 |
| Acompanhar atrasos | Em aberto → filtro Atrasados | US04 |

## Sem becos sem saída

Toda tela tem uma saída: o menu fica sempre visível, e os estados vazio e de erro oferecem botões (cadastrar material, registrar empréstimo, tentar novamente). A edição de material tem o botão "Voltar para a lista".

## Telas e requisitos

| Tela | Requisitos funcionais |
|---|---|
| 1. Materiais | RF02, RF03 (editar e excluir) |
| 2. Cadastro | RF01, RF03 (edição), RF04 |
| 3. Novo empréstimo | RF05 |
| 4. Empréstimos em aberto | RF06, RF07, RF08 |

RF09 (histórico por material e por solicitante) é Could e não tem tela nesta versão.
