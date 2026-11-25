import { useState } from 'react'
import Aviso from './Aviso'
import Botao from './Botao'
import Cartao from './Cartao'
import Entrada from './Entrada'
import Selo from './Selo'
import { estaAtrasado, formatarData, formatarInstante } from '../lib/datas'
import { traduzirErro } from '../lib/erros'
import { supabase } from '../lib/supabase'
import { rotulosTipo } from '../lib/tipos'
import type { EmprestimoAberto, Mensagem } from '../lib/tipos'

interface CartaoEmprestimoProps {
  emprestimo: EmprestimoAberto
  aoConcluir: (mensagem: Mensagem) => void
}

export default function CartaoEmprestimo({ emprestimo, aoConcluir }: CartaoEmprestimoProps) {
  const [confirmando, setConfirmando] = useState(false)
  const [observacao, setObservacao] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<Mensagem | null>(null)

  const atrasado = estaAtrasado(emprestimo.prazo_devolucao)
  const nomeMaterial = emprestimo.materiais?.nome ?? 'Material'

  async function devolver() {
    setEnviando(true)
    setErro(null)
    const { data, error } = await supabase
      .from('emprestimos')
      .update({
        devolvido_em: new Date().toISOString(),
        observacao_devolucao: observacao.trim() || null,
      })
      .eq('id', emprestimo.id)
      .is('devolvido_em', null)
      .select('id')
    setEnviando(false)

    if (error) {
      setErro({ tipo: 'erro', texto: traduzirErro(error) })
      return
    }
    if (!data || data.length === 0) {
      setErro({ tipo: 'erro', texto: 'Este empréstimo já foi devolvido. Atualize a página.' })
      return
    }
    aoConcluir({ tipo: 'sucesso', texto: `Devolução de "${nomeMaterial}" registrada.` })
  }

  return (
    <Cartao alerta={atrasado}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{nomeMaterial}</h2>
          <p className="text-sm text-slate-600">
            Patrimônio {emprestimo.materiais?.codigo_patrimonio ?? '-'}
          </p>
        </div>
        {atrasado ? <Selo tipo="erro">Atrasado</Selo> : <Selo tipo="sucesso">No prazo</Selo>}
      </div>
      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm text-slate-800">
        <dt className="text-slate-600">Solicitante</dt>
        <dd>
          {emprestimo.solicitantes?.nome ?? '-'}
          {emprestimo.solicitantes ? ` (${rotulosTipo[emprestimo.solicitantes.tipo]})` : ''}
        </dd>
        <dt className="text-slate-600">Emprestado em</dt>
        <dd>{formatarInstante(emprestimo.emprestado_em)}</dd>
        <dt className="text-slate-600">Prazo</dt>
        <dd>{formatarData(emprestimo.prazo_devolucao)}</dd>
      </dl>
      {erro && (
        <div className="mt-3">
          <Aviso mensagem={erro} />
        </div>
      )}
      {confirmando ? (
        <div className="mt-4 flex flex-col gap-3">
          <Entrada
            id={`observacao-${emprestimo.id}`}
            rotulo="Observação sobre o estado do material (opcional)"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            autoComplete="off"
          />
          <div className="flex flex-wrap gap-2">
            <Botao carregando={enviando} onClick={devolver}>
              Confirmar devolução
            </Botao>
            <Botao variante="secundario" disabled={enviando} onClick={() => setConfirmando(false)}>
              Cancelar
            </Botao>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <Botao onClick={() => setConfirmando(true)}>Registrar devolução</Botao>
        </div>
      )}
    </Cartao>
  )
}
