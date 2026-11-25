import type { InputHTMLAttributes } from 'react'

interface EntradaProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  rotulo: string
  erro?: string
  dica?: string
}

export default function Entrada({ id, rotulo, erro, dica, className = '', ...resto }: EntradaProps) {
  const idMensagem = `${id}-mensagem`
  const mensagem = erro || dica

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-slate-800">
        {rotulo}
      </label>
      <input
        id={id}
        aria-invalid={erro ? true : undefined}
        aria-describedby={mensagem ? idMensagem : undefined}
        className={`min-h-[44px] w-full rounded-lg border bg-white px-3 text-base text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primaria-600 ${erro ? 'border-red-700' : 'border-slate-400'} ${className}`}
        {...resto}
      />
      {mensagem && (
        <p id={idMensagem} className={`text-sm ${erro ? 'text-red-700' : 'text-slate-600'}`}>
          {mensagem}
        </p>
      )}
    </div>
  )
}
