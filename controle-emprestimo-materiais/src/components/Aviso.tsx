import type { Mensagem } from '../lib/tipos'

interface AvisoProps {
  mensagem: Mensagem
}

export default function Aviso({ mensagem }: AvisoProps) {
  const sucesso = mensagem.tipo === 'sucesso'

  return (
    <div
      role={sucesso ? 'status' : 'alert'}
      className={`rounded-lg border px-4 py-3 text-sm ${sucesso ? 'border-green-700 bg-green-50 text-green-900' : 'border-red-700 bg-red-50 text-red-900'}`}
    >
      {mensagem.texto}
    </div>
  )
}
