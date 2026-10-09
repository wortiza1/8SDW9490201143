const API_URL = (import.meta.env?.VITE_API_URL || 'http://localhost:4000/api').replace(/\/$/, '')

// Un solo lugar para fetch, el token y los errores de la API.
export async function apiRequest(ruta, { method = 'GET', body, token } = {}) {
  const esArchivo = body instanceof FormData
  let respuesta
  try {
    respuesta = await fetch(API_URL + ruta, {
      method,
      headers: {
        ...(body !== undefined && !esArchivo ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: 'Bearer ' + token } : {}),
      },
      ...(body !== undefined ? { body: esArchivo ? body : JSON.stringify(body) } : {}),
    })
  } catch {
    throw new Error('No se pudo conectar con la API. Comprueba que el backend esté encendido.')
  }
  if (respuesta.status === 204) return null
  const datos = await respuesta.json().catch(() => ({}))
  if (!respuesta.ok) {
    const error = new Error(datos.mensaje || 'No se pudo completar la petición.')
    error.status = respuesta.status
    throw error
  }
  return datos
}

// Las imágenes subidas las sirve Express; las originales siguen en public/img.
export function imagenUrl(ruta) {
  return ruta?.startsWith('/uploads/') ? API_URL.replace(/\/api$/, '') + ruta : ruta
}
