import { useCallback, useEffect, useState } from 'react'
import Aviso from '../components/Aviso'
import Botao from '../components/Botao'
import CartaoMaterial from '../components/CartaoMaterial'
import Carregando from '../components/Carregando'
import ErroCarregar from '../components/ErroCarregar'
import Vazio from '../components/Vazio'
import { useConsulta } from '../hooks/useConsulta'
import { traduzirErro } from '../lib/erros'
import { supabase } from '../lib/supabase'
import type { MaterialComEmprestimo, Mensagem, Tela } from '../lib/tipos'

type Filtro = 'todos' | 'disponivel' | 'emprestado'

const filtros: { valor: Filtro; rotulo: string }[] = [
  { valor: 'todos', rotulo: 'Todos' },
  { valor: 'disponivel', rotulo: 'Disponíveis' },
  { valor: 'emprestado', rotulo: 'Emprestados' },
]

interface MateriaisProps {
  aoEditar: (id: string) => void
  aoNavegar: (tela: Tela) => void
}

function limparBusca(texto: string): string {
  return texto.replace(/[,()%*_\\"]/g, ' ').trim()
}

export default function Materiais({ aoEditar, aoNavegar }: MateriaisProps) {
  const [digitado, setDigitado] = useState('')
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState<Filtro>('todos')
  const [mensagem, setMensagem] = useState<Mensagem | null>(null)

  useEffect(() => {
    const espera = setTimeout(() => setBusca(digitado), 300)
    return () => clearTimeout(espera)
  }, [digitado])

  const consultar = useCallback(async () => {
    let consulta = supabase
      .from('materiais')
      .select(
        'id, nome, codigo_patrimonio, categoria, estado_conservacao, situacao, emprestimos(prazo_devolucao, solicitantes(nome))',
      )
      .is('emprestimos.devolvido_em', null)
    if (filtro !== 'todos') {
      consulta = consulta.eq('situacao', filtro)
    }
    const termo = limparBusca(busca)
    if (termo) {
      consulta = consulta.or(`nome.ilike.%${termo}%,codigo_patrimonio.ilike.%${termo}%`)
    }
    const { data, error } = await consulta.order('nome')
    if (error) {
      throw error
    }
    return data as unknown as MaterialComEmprestimo[]
  }, [busca, filtro])

  const { dados, carregando, erro, recarregar } = useConsulta(consultar)

  async function excluir(material: MaterialComEmprestimo) {
    if (!window.confirm(`Excluir o material "${material.nome}"?`)) {
      return
    }
    const { error } = await supabase.from('materiais').delete().eq('id', material.id)
    if (error) {
      setMensagem({ tipo: 'erro', texto: traduzirErro(error) })
      return
    }
    setMensagem({ tipo: 'sucesso', texto: `Material "${material.nome}" excluído.` })
    recarregar()
  }

  function conteudo() {
    if (erro) {
      return <ErroCarregar mensagem={erro} aoTentarNovamente={recarregar} />
    }
    if (carregando && !dados) {
      return <Carregando mensagem="Carregando materiais..." />
    }
    if (!dados || dados.length === 0) {
      if (busca || filtro !== 'todos') {
        return (
          <Vazio
            titulo="Nenhum material encontrado"
            descricao="Tente outro nome, outro código ou outro filtro."
          />
        )
      }
      return (
        <Vazio titulo="Nenhum material cadastrado" descricao="Cadastre o primeiro material do laboratório.">
          <Botao onClick={() => aoNavegar('cadastro')}>Cadastrar material</Botao>
        </Vazio>
      )
    }
    return (
      <ul aria-busy={carregando} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {dados.map((material) => (
          <li key={material.id}>
            <CartaoMaterial material={material} aoEditar={aoEditar} aoExcluir={excluir} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Materiais</h1>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="busca" className="text-sm font-medium text-slate-800">
            Buscar por nome ou código de patrimônio
          </label>
          <input
            id="busca"
            type="search"
            value={digitado}
            onChange={(e) => setDigitado(e.target.value)}
            autoComplete="off"
            className="min-h-[44px] w-full rounded-lg border border-slate-400 bg-white px-3 text-base text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primaria-600"
          />
        </div>
        <div role="group" aria-label="Filtrar por situação" className="grid grid-cols-3 gap-2">
          {filtros.map((item) => (
            <Botao
              key={item.valor}
              variante={filtro === item.valor ? 'primario' : 'secundario'}
              aria-pressed={filtro === item.valor}
              onClick={() => setFiltro(item.valor)}
            >
              {item.rotulo}
            </Botao>
          ))}
        </div>
      </div>
      {mensagem && (
        <div className="mt-4">
          <Aviso mensagem={mensagem} />
        </div>
      )}
      <div className="mt-4">{conteudo()}</div>
    </div>
  )
}
