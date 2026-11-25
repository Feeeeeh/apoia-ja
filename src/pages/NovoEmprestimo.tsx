import { useCallback, useState } from 'react'
import type { FormEvent } from 'react'
import Aviso from '../components/Aviso'
import Botao from '../components/Botao'
import Cartao from '../components/Cartao'
import Carregando from '../components/Carregando'
import Entrada from '../components/Entrada'
import ErroCarregar from '../components/ErroCarregar'
import Selecao from '../components/Selecao'
import Vazio from '../components/Vazio'
import { useConsulta } from '../hooks/useConsulta'
import { formatarData, hoje } from '../lib/datas'
import { traduzirErro } from '../lib/erros'
import { supabase } from '../lib/supabase'
import { rotulosTipo } from '../lib/tipos'
import type { Mensagem, OpcaoMaterial, OpcaoSolicitante, Tela } from '../lib/tipos'

interface NovoEmprestimoProps {
  aoNavegar: (tela: Tela) => void
}

interface Valores {
  material: string
  solicitante: string
  prazo: string
}

const valoresVazios: Valores = {
  material: '',
  solicitante: '',
  prazo: '',
}

export default function NovoEmprestimo({ aoNavegar }: NovoEmprestimoProps) {
  const [valores, setValores] = useState<Valores>(valoresVazios)
  const [erros, setErros] = useState<Partial<Record<keyof Valores, string>>>({})
  const [enviando, setEnviando] = useState(false)
  const [mensagem, setMensagem] = useState<Mensagem | null>(null)

  const consultar = useCallback(async () => {
    const [materiais, solicitantes] = await Promise.all([
      supabase
        .from('materiais')
        .select('id, nome, codigo_patrimonio')
        .eq('situacao', 'disponivel')
        .order('nome'),
      supabase.from('solicitantes').select('id, nome, tipo').order('nome'),
    ])
    if (materiais.error) {
      throw materiais.error
    }
    if (solicitantes.error) {
      throw solicitantes.error
    }
    return {
      materiais: materiais.data as unknown as OpcaoMaterial[],
      solicitantes: solicitantes.data as unknown as OpcaoSolicitante[],
    }
  }, [])

  const { dados, carregando, erro, recarregar } = useConsulta(consultar)

  function alterar(campo: keyof Valores, valor: string) {
    setValores({ ...valores, [campo]: valor })
    setErros({ ...erros, [campo]: undefined })
  }

  async function enviar(evento: FormEvent) {
    evento.preventDefault()
    const novos: Partial<Record<keyof Valores, string>> = {}
    if (!valores.material) {
      novos.material = 'Selecione um material disponível.'
    }
    if (!valores.solicitante) {
      novos.solicitante = 'Selecione o solicitante.'
    }
    if (!valores.prazo) {
      novos.prazo = 'Informe o prazo de devolução.'
    } else if (valores.prazo < hoje()) {
      novos.prazo = 'O prazo não pode ser anterior à data de hoje.'
    }
    setErros(novos)
    const primeiroCampo = Object.keys(novos)[0]
    if (primeiroCampo) {
      document.getElementById(primeiroCampo)?.focus()
      return
    }

    setEnviando(true)
    setMensagem(null)
    const { error } = await supabase.from('emprestimos').insert({
      material_id: valores.material,
      solicitante_id: valores.solicitante,
      prazo_devolucao: valores.prazo,
    })
    setEnviando(false)

    if (error) {
      setMensagem({ tipo: 'erro', texto: traduzirErro(error) })
      recarregar()
      return
    }
    const nomeMaterial = dados?.materiais.find((m) => m.id === valores.material)?.nome ?? 'Material'
    const nomeSolicitante =
      dados?.solicitantes.find((s) => s.id === valores.solicitante)?.nome ?? 'solicitante'
    setMensagem({
      tipo: 'sucesso',
      texto: `${nomeMaterial} emprestado para ${nomeSolicitante} até ${formatarData(valores.prazo)}.`,
    })
    setValores(valoresVazios)
    recarregar()
  }

  function conteudo() {
    if (erro) {
      return <ErroCarregar mensagem={erro} aoTentarNovamente={recarregar} />
    }
    if (carregando && !dados) {
      return <Carregando mensagem="Carregando materiais e solicitantes..." />
    }
    if (dados && dados.solicitantes.length === 0) {
      return (
        <Vazio titulo="Nenhum solicitante cadastrado" descricao="Cadastre quem vai retirar o material.">
          <Botao onClick={() => aoNavegar('cadastro')}>Ir para o cadastro</Botao>
        </Vazio>
      )
    }
    if (dados && dados.materiais.length === 0) {
      return (
        <Vazio
          titulo="Nenhum material disponível"
          descricao="Todos os materiais estão emprestados ou ainda não foram cadastrados."
        >
          <Botao onClick={() => aoNavegar('abertos')}>Ver empréstimos em aberto</Botao>
          <Botao variante="secundario" onClick={() => aoNavegar('cadastro')}>
            Cadastrar material
          </Botao>
        </Vazio>
      )
    }
    return (
      <Cartao>
        <form onSubmit={enviar} noValidate className="flex flex-col gap-4">
          <Selecao
            id="material"
            rotulo="Material disponível"
            value={valores.material}
            onChange={(e) => alterar('material', e.target.value)}
            erro={erros.material}
          >
            <option value="">Selecione...</option>
            {dados?.materiais.map((material) => (
              <option key={material.id} value={material.id}>
                {material.nome} ({material.codigo_patrimonio})
              </option>
            ))}
          </Selecao>
          <Selecao
            id="solicitante"
            rotulo="Solicitante"
            value={valores.solicitante}
            onChange={(e) => alterar('solicitante', e.target.value)}
            erro={erros.solicitante}
          >
            <option value="">Selecione...</option>
            {dados?.solicitantes.map((solicitante) => (
              <option key={solicitante.id} value={solicitante.id}>
                {solicitante.nome} ({rotulosTipo[solicitante.tipo]})
              </option>
            ))}
          </Selecao>
          <Entrada
            id="prazo"
            type="date"
            min={hoje()}
            rotulo="Prazo de devolução"
            value={valores.prazo}
            onChange={(e) => alterar('prazo', e.target.value)}
            erro={erros.prazo}
          />
          <div>
            <Botao type="submit" carregando={enviando}>
              Registrar empréstimo
            </Botao>
          </div>
        </form>
      </Cartao>
    )
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-bold">Novo empréstimo</h1>
      {mensagem && (
        <div className="mt-4">
          <Aviso mensagem={mensagem} />
        </div>
      )}
      <div className="mt-4">{conteudo()}</div>
    </div>
  )
}
