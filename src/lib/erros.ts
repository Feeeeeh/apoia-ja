interface ErroBanco {
  code?: string
  message?: string
}

export function traduzirErro(erro: ErroBanco): string {
  if (erro.code === '23505') {
    return 'Já existe um registro com esse valor.'
  }
  if (erro.code === '23503') {
    return 'Operação bloqueada: o registro está relacionado a outros dados, como empréstimos.'
  }
  if (erro.code === 'P0001' && erro.message) {
    return erro.message
  }
  if (erro.message && erro.message.includes('Failed to fetch')) {
    return 'Sem conexão com o servidor. Verifique sua internet e tente novamente.'
  }
  return 'Ocorreu um erro inesperado. Tente novamente.'
}
