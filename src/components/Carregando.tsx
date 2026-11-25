interface CarregandoProps {
  mensagem?: string
}

export default function Carregando({ mensagem = 'Carregando...' }: CarregandoProps) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 p-8 text-slate-700">
      <span
        aria-hidden="true"
        className="h-5 w-5 animate-spin rounded-full border-2 border-primaria-600 border-t-transparent"
      />
      <span>{mensagem}</span>
    </div>
  )
}
