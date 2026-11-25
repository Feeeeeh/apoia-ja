import type { SelectHTMLAttributes } from 'react'

interface SelecaoProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  rotulo: string
  erro?: string
}

export default function Selecao({ id, rotulo, erro, className = '', children, ...resto }: SelecaoProps) {
  const idMensagem = `${id}-mensagem`

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-slate-800">
        {rotulo}
      </label>
      <select
        id={id}
        aria-invalid={erro ? true : undefined}
        aria-describedby={erro ? idMensagem : undefined}
        className={`min-h-[44px] w-full rounded-lg border bg-white px-3 text-base text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primaria-600 ${erro ? 'border-red-700' : 'border-slate-400'} ${className}`}
        {...resto}
      >
        {children}
      </select>
      {erro && (
        <p id={idMensagem} className="text-sm text-red-700">
          {erro}
        </p>
      )}
    </div>
  )
}
