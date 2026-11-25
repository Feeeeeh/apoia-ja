export function hoje(): string {
  const agora = new Date()
  const ano = agora.getFullYear()
  const mes = String(agora.getMonth() + 1).padStart(2, '0')
  const dia = String(agora.getDate()).padStart(2, '0')
  return `${ano}-${mes}-${dia}`
}

export function formatarData(data: string): string {
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}

export function formatarInstante(instante: string): string {
  return new Date(instante).toLocaleDateString('pt-BR')
}

export function estaAtrasado(prazo: string): boolean {
  return prazo < hoje()
}
