import { useEffect, useState } from 'react'
import { apiRequest } from '../services/api.js'

export default function useProductos(filtro = '') {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [version, setVersion] = useState(0)
  const recargar = () => setVersion((actual) => actual + 1)

  useEffect(() => {
    let activo = true
    setCargando(true)
    setError('')
    apiRequest('/recursos' + filtro)
      .then((datos) => { if (activo) setProductos(datos) })
      .catch((fallo) => { if (activo) { setError(fallo.message); setProductos([]) } })
      .finally(() => { if (activo) setCargando(false) })
    // Evita que una respuesta antigua cambie la página después de navegar.
    return () => { activo = false }
  }, [filtro, version])

  return { productos, cargando, error, recargar }
}
