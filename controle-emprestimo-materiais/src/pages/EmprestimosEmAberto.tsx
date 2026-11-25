import { useCallback, useState } from 'react'
import Aviso from '../components/Aviso'
import Botao from '../components/Botao'
import CartaoEmprestimo from '../components/CartaoEmprestimo'
import Carregando from '../components/Carregando'
import ErroCarregar from '../components/ErroCarregar'
import Vazio from '../components/Vazio'
import { useConsulta } from '../hooks/useConsulta'
import { estaAtrasado } from '../lib/datas'
import { supabase } from '../lib/supabase'
import type { EmprestimoAberto, Mensagem, Tela } from '../lib/tipos'

interface EmprestimosEmAbertoProps {
  aoNavegar: (tela: Tela) => void
}

export default function EmprestimosEmAberto({ aoNavegar }: EmprestimosEmAbertoProps) {
  const [somenteAtrasados, setSomenteAtrasados] = useState(false)
  const [mensagem, setMensagem] = useState<Mensagem | null>(null)

  const consultar = useCallback(async () => {
    const { data, error } = await supabase
      .from('emprestimos')
      .select(
        'id, emprestado_em, prazo_devolucao, materiais(nome, codigo_patrimonio), solicitantes(nome, tipo)',
      )
      .is('devolvido_em', null)
      .order('prazo_devolucao')
    if (error) {
      throw error
    }
    return data as unknown as EmprestimoAberto[]
  }, [])

  const { dados, carregando, erro, recarregar } = useConsulta(consultar)

  function concluir(resultado: Mensagem) {
    setMensagem(resultado)
    recarregar()
  }

  function conteudo() {
    if (erro) {
      return <ErroCarregar mensagem={erro} aoTentarNovamente={recarregar} />
    }
    if (carregando && !dados) {
      return <Carregando mensagem="Carregando empréstimos..." />
    }
    if (!dados || dados.length === 0) {
      return (
        <Vazio titulo="Nenhum empréstimo em aberto" descricao="Todos os materiais foram devolvidos.">
          <Botao onClick={() => aoNavegar('emprestar')}>Registrar empréstimo</Botao>
        </Vazio>
      )
    }
    const atrasados = dados.filter((e) => estaAtrasado(e.prazo_devolucao))
    const visiveis = somenteAtrasados ? atrasados : dados
    return (
      <>
        <div role="group" aria-label="Filtrar empréstimos" className="grid max-w-md grid-cols-2 gap-2">
          <Botao
            variante={somenteAtrasados ? 'secundario' : 'primario'}
            aria-pressed={!somenteAtrasados}
            onClick={() => setSomenteAtrasados(false)}
          >
            Todos ({dados.length})
          </Botao>
          <Botao
            variante={somenteAtrasados ? 'primario' : 'secundario'}
            aria-pressed={somenteAtrasados}
            onClick={() => setSomenteAtrasados(true)}
          >
            Atrasados ({atrasados.length})
          </Botao>
        </div>
        <div className="mt-4">
          {visiveis.length === 0 ? (
            <Vazio titulo="Nenhum empréstimo atrasado" descricao="Todos os prazos estão em dia." />
          ) : (
            <ul aria-busy={carregando} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visiveis.map((emprestimo) => (
                <li key={emprestimo.id}>
                  <CartaoEmprestimo emprestimo={emprestimo} aoConcluir={concluir} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Empréstimos em aberto</h1>
      {mensagem && (
        <div className="mt-4">
          <Aviso mensagem={mensagem} />
        </div>
      )}
      <div className="mt-4">{conteudo()}</div>
    </div>
  )
}
