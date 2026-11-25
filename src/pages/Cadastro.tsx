import { useCallback, useState } from 'react'
import Botao from '../components/Botao'
import Cartao from '../components/Cartao'
import Carregando from '../components/Carregando'
import ErroCarregar from '../components/ErroCarregar'
import FormMaterial from '../components/FormMaterial'
import FormSolicitante from '../components/FormSolicitante'
import { useConsulta } from '../hooks/useConsulta'
import { supabase } from '../lib/supabase'
import type { Material } from '../lib/tipos'

type Aba = 'material' | 'solicitante'

interface CadastroProps {
  idMaterialEdicao: string | null
  aoVoltar: () => void
}

export default function Cadastro({ idMaterialEdicao, aoVoltar }: CadastroProps) {
  const [aba, setAba] = useState<Aba>('material')

  const consultar = useCallback(async () => {
    if (!idMaterialEdicao) {
      return null
    }
    const { data, error } = await supabase
      .from('materiais')
      .select('id, nome, codigo_patrimonio, categoria, estado_conservacao, situacao')
      .eq('id', idMaterialEdicao)
      .single()
    if (error) {
      throw error
    }
    return data as Material
  }, [idMaterialEdicao])

  const { dados, carregando, erro, recarregar } = useConsulta(consultar)

  if (idMaterialEdicao && erro) {
    return <ErroCarregar mensagem={erro} aoTentarNovamente={recarregar} />
  }
  if (idMaterialEdicao && carregando) {
    return <Carregando mensagem="Carregando material..." />
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-bold">{idMaterialEdicao ? 'Editar material' : 'Cadastro'}</h1>
      {!idMaterialEdicao && (
        <div role="group" aria-label="O que cadastrar" className="mt-4 grid grid-cols-2 gap-2">
          <Botao
            variante={aba === 'material' ? 'primario' : 'secundario'}
            aria-pressed={aba === 'material'}
            onClick={() => setAba('material')}
          >
            Material
          </Botao>
          <Botao
            variante={aba === 'solicitante' ? 'primario' : 'secundario'}
            aria-pressed={aba === 'solicitante'}
            onClick={() => setAba('solicitante')}
          >
            Solicitante
          </Botao>
        </div>
      )}
      <Cartao className="mt-4">
        {aba === 'material' ? (
          <FormMaterial inicial={dados ?? undefined} aoVoltar={idMaterialEdicao ? aoVoltar : undefined} />
        ) : (
          <FormSolicitante />
        )}
      </Cartao>
    </div>
  )
}
