import type { ButtonHTMLAttributes } from 'react'

type Variante = 'primario' | 'secundario' | 'perigo'

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante
  carregando?: boolean
}

const estilos: Record<Variante, string> = {
  primario: 'bg-primaria-600 text-white hover:bg-primaria-700',
  secundario: 'border border-primaria-600 bg-white text-primaria-700 hover:bg-primaria-50',
  perigo: 'border border-red-700 bg-white text-red-700 hover:bg-red-50',
}

export default function Botao({
  variante = 'primario',
  carregando = false,
  type = 'button',
  disabled,
  className = '',
  children,
  ...resto
}: BotaoProps) {
  return (
    <button
      type={type}
      disabled={disabled || carregando}
      className={`inline-flex min-h-[44px] items-center justify-center rounded-lg px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaria-600 disabled:cursor-not-allowed disabled:opacity-50 ${estilos[variante]} ${className}`}
      {...resto}
    >
      {carregando ? 'Aguarde...' : children}
    </button>
  )
}
