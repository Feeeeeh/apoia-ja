import { useState } from 'react'
import Menu from './components/Menu'
import Cadastro from './pages/Cadastro'
import EmprestimosEmAberto from './pages/EmprestimosEmAberto'
import Materiais from './pages/Materiais'
import NovoEmprestimo from './pages/NovoEmprestimo'
import type { Tela } from './lib/tipos'

export default function App() {
  const [tela, setTela] = useState<Tela>('materiais')
  const [idMaterialEdicao, setIdMaterialEdicao] = useState<string | null>(null)

  function navegar(proxima: Tela) {
    setIdMaterialEdicao(null)
    setTela(proxima)
  }

  function editarMaterial(id: string) {
    setIdMaterialEdicao(id)
    setTela('cadastro')
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b-4 border-destaque-500 bg-primaria-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <p className="text-lg font-bold">Empréstimo de Materiais</p>
          <Menu telaAtual={tela} aoNavegar={navegar} />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        {tela === 'materiais' && <Materiais aoEditar={editarMaterial} aoNavegar={navegar} />}
        {tela === 'cadastro' && (
          <Cadastro
            key={idMaterialEdicao ?? 'novo'}
            idMaterialEdicao={idMaterialEdicao}
            aoVoltar={() => navegar('materiais')}
          />
        )}
        {tela === 'emprestar' && <NovoEmprestimo aoNavegar={navegar} />}
        {tela === 'abertos' && <EmprestimosEmAberto aoNavegar={navegar} />}
      </main>
    </div>
  )
}
