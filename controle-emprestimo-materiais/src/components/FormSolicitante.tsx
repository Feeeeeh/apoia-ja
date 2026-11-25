import { useState } from 'react'
import type { FormEvent } from 'react'
import Aviso from './Aviso'
import Botao from './Botao'
import Entrada from './Entrada'
import Selecao from './Selecao'
import { traduzirErro } from '../lib/erros'
import { supabase } from '../lib/supabase'
import { rotulosTipo } from '../lib/tipos'
import type { Mensagem } from '../lib/tipos'

interface Valores {
  nome: string
  tipo: string
  contato: string
}

type Erros = Partial<Record<keyof Valores, string>>

const valoresVazios: Valores = {
  nome: '',
  tipo: 'aluno',
  contato: '',
}

function contatoValido(contato: string): boolean {
  const ehEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contato)
  const digitos = contato.replace(/\D/g, '')
  const ehTelefone = /^[\d\s()+-]+$/.test(contato) && digitos.length >= 10 && digitos.length <= 13
  return ehEmail || ehTelefone
}

export default function FormSolicitante() {
  const [valores, setValores] = useState<Valores>(valoresVazios)
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
      novos.nome = 'Informe o nome do solicitante (mínimo de 2 caracteres).'
    }
    if (!contatoValido(valores.contato.trim())) {
      novos.contato = 'Informe um e-mail válido ou um telefone com DDD.'
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
      tipo: valores.tipo,
      contato: valores.contato.trim(),
    }
    const { error } = await supabase.from('solicitantes').insert(dados)
    setEnviando(false)

    if (error) {
      setMensagem({ tipo: 'erro', texto: traduzirErro(error) })
      return
    }
    setMensagem({ tipo: 'sucesso', texto: `Solicitante "${dados.nome}" cadastrado.` })
    setValores(valoresVazios)
  }

  return (
    <form onSubmit={enviar} noValidate className="flex flex-col gap-4">
      {mensagem && <Aviso mensagem={mensagem} />}
      <Entrada
        id="nome"
        rotulo="Nome"
        value={valores.nome}
        onChange={(e) => alterar('nome', e.target.value)}
        erro={erros.nome}
        autoComplete="off"
      />
      <Selecao
        id="tipo"
        rotulo="Tipo"
        value={valores.tipo}
        onChange={(e) => alterar('tipo', e.target.value)}
      >
        {Object.entries(rotulosTipo).map(([valor, rotulo]) => (
          <option key={valor} value={valor}>
            {rotulo}
          </option>
        ))}
      </Selecao>
      <Entrada
        id="contato"
        rotulo="Contato"
        value={valores.contato}
        onChange={(e) => alterar('contato', e.target.value)}
        erro={erros.contato}
        dica="E-mail ou telefone com DDD. Não peça CPF nem RG."
        autoComplete="off"
      />
      <div>
        <Botao type="submit" carregando={enviando}>
          Cadastrar solicitante
        </Botao>
      </div>
    </form>
  )
}
