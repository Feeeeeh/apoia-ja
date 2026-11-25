import type { ReactNode } from 'react'

type TipoSelo = 'sucesso' | 'aviso' | 'erro' | 'neutro'

interface SeloProps {
  tipo?: TipoSelo
  children: ReactNode
}

const estilos: Record<TipoSelo, string> = {
  sucesso: 'bg-green-100 text-green-800',
  aviso: 'bg-amber-100 text-amber-900',
  erro: 'bg-red-100 text-red-800',
  neutro: 'bg-slate-100 text-slate-800',
}

export default function Selo({ tipo = 'neutro', children }: SeloProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${estilos[tipo]}`}
    >
      {children}
    </span>
  )
}
