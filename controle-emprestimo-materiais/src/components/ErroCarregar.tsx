import Botao from './Botao'

interface ErroCarregarProps {
  mensagem: string
  aoTentarNovamente: () => void
}

export default function ErroCarregar({ mensagem, aoTentarNovamente }: ErroCarregarProps) {
  return (
    <div role="alert" className="rounded-xl border border-red-700 bg-red-50 p-6 text-center">
      <p className="font-semibold text-red-900">Não foi possível carregar os dados.</p>
      <p className="mt-1 text-sm text-red-900">{mensagem}</p>
      <Botao className="mt-4" onClick={aoTentarNovamente}>
        Tentar novamente
      </Botao>
    </div>
  )
}
