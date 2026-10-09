export const estadoInicial = { usuario: null, token: null, cargando: false, error: null }

// LOGIN reemplaza LOGIN_SUCCESS de Tarea 3 y recibe la respuesta real de la API.
export function authReducer(estado, accion) {
  switch (accion.type) {
    case 'LOGIN_START':
      return { ...estadoInicial, cargando: true }
    case 'LOGIN':
      return { ...estadoInicial, usuario: accion.payload.usuario, token: accion.payload.token }
    case 'LOGIN_ERROR':
      return { ...estadoInicial, error: accion.payload }
    case 'LOGOUT':
      return { ...estadoInicial }
    default:
      return estado
  }
}
