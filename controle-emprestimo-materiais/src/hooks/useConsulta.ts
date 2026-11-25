import { useCallback, useEffect, useState } from 'react'
import { traduzirErro } from '../lib/erros'

export function useConsulta<T>(consultar: () => Promise<T>) {
  const [dados, setDados] = useState<T | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let ativo = true
    setCarregando(true)
    setErro(null)
    consultar()
      .then((resultado) => {
        if (ativo) {
          setDados(resultado)
        }
      })
      .catch((falha) => {
        if (ativo) {
          setErro(traduzirErro(falha))
        }
      })
      .finally(() => {
        if (ativo) {
          setCarregando(false)
        }
      })
    return () => {
      ativo = false
    }
  }, [consultar, tentativa])

  const recarregar = useCallback(() => {
    setTentativa((n) => n + 1)
  }, [])

  return { dados, carregando, erro, recarregar }
}
