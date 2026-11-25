# Tokens visuais

Exercício 02 · Passo 3. Os tokens ficam em `tailwind.config.js`, e o restante usa a escala padrão do Tailwind.

## Cores

A paleta é inspirada no azul e no laranja da identidade do Senac. Os valores foram escolhidos para este projeto e não são a paleta oficial.

| Token | Valor | Uso |
|---|---|---|
| `primaria-50` | `#eaf2fb` | Fundo ao passar o mouse em botões secundários |
| `primaria-600` | `#0b5cad` | Botão primário, foco |
| `primaria-700` | `#084a8c` | Cabeçalho, texto de botão secundário |
| `primaria-800` | `#063a6e` | Texto do item ativo do menu |
| `destaque-500` | `#f7941d` | Faixa de destaque abaixo do cabeçalho (apenas decorativo) |
| Cinzas (`slate`) | escala padrão | Texto, bordas e fundo da página |
| Verde, âmbar, vermelho | escala padrão | Disponível, emprestado, atrasado e erro |

O laranja nunca é usado como cor de texto, porque não tem contraste suficiente sobre branco. A situação do material também aparece em texto ("Disponível", "Emprestado", "Atrasado"), então a cor nunca é a única informação.

### Contraste (calculado pela fórmula WCAG)

| Combinação | Razão |
|---|---|
| Branco sobre `primaria-600` (botão primário) | 6,7:1 |
| Branco sobre `primaria-700` (cabeçalho) | 8,9:1 |
| `primaria-700` sobre branco (botão secundário) | 8,9:1 |
| `slate-900` sobre `slate-50` (texto) | 17,1:1 |
| `slate-600` sobre branco (texto secundário) | 7,6:1 |
| Selo Disponível (verde 800 sobre verde 100) | 6,5:1 |
| Selo Emprestado (âmbar 900 sobre âmbar 100) | 8,1:1 |
| Selo Atrasado (vermelho 800 sobre vermelho 100) | 6,8:1 |
| Vermelho 700 sobre branco (erro e Excluir) | 6,5:1 |

Todas passam do mínimo de 4,5:1 para texto normal.

## Tipografia

Fonte do sistema (`font-sans` padrão do Tailwind), sem carregar fontes externas.

| Uso | Classe | Tamanho |
|---|---|---|
| Título da tela | `text-2xl font-bold` | 24 px |
| Título do cartão | `text-lg font-semibold` | 18 px |
| Campos de formulário | `text-base` | 16 px |
| Rótulos, apoio e botões | `text-sm` | 14 px |
| Selos | `text-xs font-semibold` | 12 px |

## Espaçamento e forma

| Token | Valor |
|---|---|
| Escala de espaçamento | múltiplos de 4 px (`gap-2` = 8 px, `gap-4` = 16 px, `p-4` = 16 px, `py-6` = 24 px) |
| Raio de borda | `rounded-lg` (8 px) em campos e botões, `rounded-xl` (12 px) em cartões |
| Alvo de toque mínimo | 44 px de altura em botões, campos e itens do menu |
| Largura máxima | 1152 px (`max-w-6xl`) nas listas, 576 px (`max-w-xl`) nos formulários |
| Pontos de quebra | 640 px (`sm`, 2 colunas) e 1280 px (`xl`, 3 colunas) |

## Foco

Todo elemento interativo tem contorno visível de 2 px no foco por teclado (`focus-visible:outline`).
