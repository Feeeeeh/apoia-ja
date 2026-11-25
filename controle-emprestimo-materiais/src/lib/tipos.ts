export type Tela = 'materiais' | 'cadastro' | 'emprestar' | 'abertos'
export type Situacao = 'disponivel' | 'emprestado'
export type EstadoConservacao = 'otimo' | 'bom' | 'regular' | 'ruim'
export type TipoSolicitante = 'aluno' | 'professor' | 'funcionario'

export interface Mensagem {
  tipo: 'sucesso' | 'erro'
  texto: string
}

export interface Material {
  id: string
  nome: string
  codigo_patrimonio: string
  categoria: string
  estado_conservacao: EstadoConservacao
  situacao: Situacao
}

export interface MaterialComEmprestimo extends Material {
  emprestimos: {
    prazo_devolucao: string
    solicitantes: { nome: string } | null
  }[]
}

export interface OpcaoMaterial {
  id: string
  nome: string
  codigo_patrimonio: string
}

export interface OpcaoSolicitante {
  id: string
  nome: string
  tipo: TipoSolicitante
}

export interface EmprestimoAberto {
  id: string
  emprestado_em: string
  prazo_devolucao: string
  materiais: { nome: string; codigo_patrimonio: string } | null
  solicitantes: { nome: string; tipo: TipoSolicitante } | null
}

export const rotulosConservacao: Record<EstadoConservacao, string> = {
  otimo: 'Ótimo',
  bom: 'Bom',
  regular: 'Regular',
  ruim: 'Ruim',
}

export const rotulosTipo: Record<TipoSolicitante, string> = {
  aluno: 'Aluno',
  professor: 'Professor',
  funcionario: 'Funcionário',
}
