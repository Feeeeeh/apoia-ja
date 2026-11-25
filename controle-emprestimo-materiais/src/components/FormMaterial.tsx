import { useState } from 'react'
import type { FormEvent } from 'react'
import Aviso from './Aviso'
import Botao from './Botao'
import Entrada from './Entrada'
import Selecao from './Selecao'
import { traduzirErro } from '../lib/erros'
import { supabase } from '../lib/supabase'
import { rotulosConservacao } from '../lib/tipos'
import type { Material, Mensagem } from '../lib/tipos'

interface FormMaterialProps {
  inicial?: Material
  aoVoltar?: () => void
}

interface Valores {
  nome: string
  codigo: string
  categoria: string
  conservacao: string
}

type Erros = Partial<Record<keyof Valores, string>>

const valoresVazios: Valores = {
  nome: '',
  codigo: '',
  categoria: '',
  conservacao: 'bom',
}

export default function FormMaterial({ inicial, aoVoltar }: FormMaterialProps) {
  const [valores, setValores] = useState<Valores>(
    inicial
      ? {
          nome: inicial.nome,
          codigo: inicial.codigo_patrimonio,
          categoria: inicial.categoria,
          conservacao: inicial.estado_conservacao,
        }
      : valoresVazios,
  )
  const [erros, setErros] = useState<Erros>({})
  const [enviando, setEnviando] = useState(false)
  const [mensagem, setMensagem] = useState<Mensagem | null>(null)

  function alterar(campo: keyof Valores, valor: string) {
    setValores({ ...valores, [campo]: valor })
    setErros({ ...erros, [campo]: undefined })
  }

  function validar(): Erros {
    const novos: Erros = {}
    if (valores.nome.trim().length < 2) {
      novos.nome = 'Informe o nome do material (mínimo de 2 caracteres).'
    }
    if (valores.codigo.trim().length === 0) {
      novos.codigo = 'Informe o código de patrimônio.'
    } else if (valores.codigo.trim().length > 30) {
      novos.codigo = 'O código deve ter no máximo 30 caracteres.'
    }
    if (valores.categoria.trim().length < 2) {
      novos.categoria = 'Informe a categoria, por exemplo: Projetor, Notebook ou Cabo.'
    }
    return novos
  }

  async function enviar(evento: FormEvent) {
    evento.preventDefault()
    const novos = validar()
    setErros(novos)
    const primeiroCampo = Object.keys(novos)[0]
    if (primeiroCampo) {
      document.getElementById(primeiroCampo)?.focus()
      return
    }

    setEnviando(true)
    setMensagem(null)
    const dados = {
      nome: valores.nome.trim(),
      codigo_patrimonio: valores.codigo.trim(),
      categoria: valores.categoria.trim(),
      estado_conservacao: valores.conservacao,
    }
    const consulta = inicial
      ? supabase.from('materiais').update(dados).eq('id', inicial.id)
      : supabase.from('materiais').insert(dados)
    const { error } = await consulta
    setEnviando(false)

    if (error && error.code === '23505') {
      setErros({ codigo: 'Já existe um material com este código de patrimônio.' })
      document.getElementById('codigo')?.focus()
      return
    }
    if (error) {
      setMensagem({ tipo: 'erro', texto: traduzirErro(error) })
      return
    }
    if (inicial) {
      setMensagem({ tipo: 'sucesso', texto: 'Material atualizado.' })
      return
    }
    setMensagem({ tipo: 'sucesso', texto: `Material "${dados.nome}" cadastrado.` })
    setValores(valoresVazios)
  }

  return (
    <form onSubmit={enviar} noValidate className="flex flex-col gap-4">
      {mensagem && <Aviso mensagem={mensagem} />}
      <Entrada
        id="nome"
        rotulo="Nome do material"
        value={valores.nome}
        onChange={(e) => alterar('nome', e.target.value)}
        erro={erros.nome}
        autoComplete="off"
      />
      <Entrada
        id="codigo"
        rotulo="Código de patrimônio"
        value={valores.codigo}
        onChange={(e) => alterar('codigo', e.target.value)}
        erro={erros.codigo}
        autoComplete="off"
      />
      <Entrada
        id="categoria"
        rotulo="Categoria"
        value={valores.categoria}
        onChange={(e) => alterar('categoria', e.target.value)}
        erro={erros.categoria}
        autoComplete="off"
      />
      <Selecao
        id="conservacao"
        rotulo="Estado de conservação"
        value={valores.conservacao}
        onChange={(e) => alterar('conservacao', e.target.value)}
      >
        {Object.entries(rotulosConservacao).map(([valor, rotulo]) => (
          <option key={valor} value={valor}>
            {rotulo}
          </option>
        ))}
      </Selecao>
      <div className="flex flex-wrap gap-2">
        <Botao type="submit" carregando={enviando}>
          {inicial ? 'Salvar alterações' : 'Cadastrar material'}
        </Botao>
        {aoVoltar && (
          <Botao variante="secundario" onClick={aoVoltar}>
            Voltar para a lista
          </Botao>
        )}
      </div>
    </form>
  )
}
