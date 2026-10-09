import test from 'node:test'
import assert from 'node:assert/strict'
import { authReducer, estadoInicial } from '../src/context/authReducer.js'

test('la respuesta de la API guarda usuario y token; logout borra ambos', () => {
  const usuario = { id: 'abc', nombre: 'Usuario real', correo: 'cliente@ejemplo.com', rol: 'cliente' }
  const inicio = authReducer(estadoInicial, { type: 'LOGIN_START' })
  assert.equal(inicio.cargando, true)
  const fallo = authReducer(inicio, { type: 'LOGIN_ERROR', payload: 'Credenciales incorrectas' })
  assert.equal(fallo.token, null)
  assert.equal(fallo.cargando, false)
  const reintento = authReducer(fallo, { type: 'LOGIN_START' })
  assert.equal(reintento.error, null)
  const exito = authReducer(reintento, { type: 'LOGIN', payload: { usuario, token: 'token-ejemplo' } })
  assert.equal(exito.usuario, usuario)
  assert.equal(exito.token, 'token-ejemplo')
  assert.equal(exito.cargando, false)
  assert.deepEqual(authReducer(exito, { type: 'LOGOUT' }), estadoInicial)
  assert.equal(exito.usuario, usuario)
  assert.equal(estadoInicial.token, null)
})

test('una acción desconocida conserva el estado', () => {
  assert.equal(authReducer(estadoInicial, { type: 'DESCONOCIDA' }), estadoInicial)
})
