import Botao from './Botao'
import Cartao from './Cartao'
import Selo from './Selo'
import { estaAtrasado, formatarData } from '../lib/datas'
import { rotulosConservacao } from '../lib/tipos'
import type { MaterialComEmprestimo } from '../lib/tipos'

interface CartaoMaterialProps {
  material: MaterialComEmprestimo
  aoEditar: (id: string) => void
  aoExcluir: (material: MaterialComEmprestimo) => void
}

export default function CartaoMaterial({ material, aoEditar, aoExcluir }: CartaoMaterialProps) {
  const emprestado = material.situacao === 'emprestado'
  const emprestimo = material.emprestimos[0]
  const atrasado = emprestado && emprestimo ? estaAtrasado(emprestimo.prazo_devolucao) : false

  return (
    <Cartao alerta={atrasado}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{material.nome}</h2>
          <p className="text-sm text-slate-600">Patrimônio {material.codigo_patrimonio}</p>
        </div>
        <Selo tipo={emprestado ? 'aviso' : 'sucesso'}>{emprestado ? 'Emprestado' : 'Disponível'}</Selo>
      </div>
      <p className="mt-2 text-sm text-slate-700">
        {material.categoria}. Conservação: {rotulosConservacao[material.estado_conservacao]}.
      </p>
      {emprestado && emprestimo && (
        <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-800">
          <span>
            Com {emprestimo.solicitantes?.nome ?? 'solicitante não identificado'} até{' '}
            {formatarData(emprestimo.prazo_devolucao)}
          </span>
          {atrasado && <Selo tipo="erro">Atrasado</Selo>}
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <Botao variante="secundario" onClick={() => aoEditar(material.id)}>
          Editar
        </Botao>
        <Botao
          variante="perigo"
          disabled={emprestado}
          title={emprestado ? 'Material emprestado não pode ser excluído' : undefined}
          onClick={() => aoExcluir(material)}
        >
          Excluir
        </Botao>
      </div>
    </Cartao>
  )
}
