import type { Tela } from '../lib/tipos'

interface MenuProps {
  telaAtual: Tela
  aoNavegar: (tela: Tela) => void
}

const itens: { tela: Tela; rotulo: string }[] = [
  { tela: 'materiais', rotulo: 'Materiais' },
  { tela: 'cadastro', rotulo: 'Cadastro' },
  { tela: 'emprestar', rotulo: 'Novo empréstimo' },
  { tela: 'abertos', rotulo: 'Em aberto' },
]

export default function Menu({ telaAtual, aoNavegar }: MenuProps) {
  return (
    <nav aria-label="Principal" className="mt-3">
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {itens.map((item) => {
          const ativo = item.tela === telaAtual
          return (
            <li key={item.tela}>
              <button
                type="button"
                aria-current={ativo ? 'page' : undefined}
                onClick={() => aoNavegar(item.tela)}
                className={`min-h-[44px] w-full rounded-lg px-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${ativo ? 'bg-white text-primaria-800' : 'border border-white/50 text-white hover:bg-primaria-800'}`}
              >
                {item.rotulo}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
