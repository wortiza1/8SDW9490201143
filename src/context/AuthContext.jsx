import { createContext, useContext, useReducer, useState } from 'react'
import { authReducer, estadoInicial } from './authReducer.js'
import { apiRequest } from '../services/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [estado, dispatch] = useReducer(authReducer, estadoInicial)
  const [mostrarLogin, setMostrarLogin] = useState(false)
  const abrirLogin = () => setMostrarLogin(true)
  const cerrarLogin = () => setMostrarLogin(false)

  const autenticar = async (ruta, datos) => {
    dispatch({ type: 'LOGIN_START' })
    try {
      const respuesta = await apiRequest(ruta, { method: 'POST', body: datos })
      dispatch({ type: 'LOGIN', payload: respuesta })
      cerrarLogin()
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error.message })
    }
  }
  const login = (correo, password) => autenticar('/auth/login', { correo, password })
  const register = (nombre, correo, password) => autenticar('/auth/register', { nombre, correo, password })
  const logout = () => dispatch({ type: 'LOGOUT' })

  return (
    <AuthContext.Provider value={{ ...estado, login, register, logout, mostrarLogin, abrirLogin, cerrarLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const contexto = useContext(AuthContext)
  if (!contexto) throw new Error('useAuth debe estar dentro de AuthProvider')
  return contexto
}
