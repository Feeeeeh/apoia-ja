import type { ReactNode } from 'react'

interface CartaoProps {
  alerta?: boolean
  className?: string
  children: ReactNode
}

export default function Cartao({ alerta = false, className = '', children }: CartaoProps) {
  return (
    <div
      className={`rounded-xl border bg-white p-4 shadow-sm ${alerta ? 'border-red-600' : 'border-slate-200'} ${className}`}
    >
      {children}
    </div>
  )
}
