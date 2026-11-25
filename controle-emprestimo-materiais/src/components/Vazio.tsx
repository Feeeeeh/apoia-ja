import type { ReactNode } from 'react'

interface VazioProps {
  titulo: string
  descricao?: string
  children?: ReactNode
}

export default function Vazio({ titulo, descricao, children }: VazioProps) {
  return (
    <div className="rounded-xl border border-dashed border-slate-400 bg-white p-8 text-center">
      <p className="text-lg font-semibold text-slate-900">{titulo}</p>
      {descricao && <p className="mt-1 text-sm text-slate-700">{descricao}</p>}
      {children && <div className="mt-4 flex flex-wrap justify-center gap-2">{children}</div>}
    </div>
  )
}
