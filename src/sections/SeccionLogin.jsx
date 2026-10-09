import { useState } from 'react'
import { Alert, Button, Form, Modal, Spinner } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext.jsx'

export default function SeccionLogin() {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [registrando, setRegistrando] = useState(false)
  const { usuario, cargando, error, login, register, cerrarLogin } = useAuth()

  const manejarEnvio = async (evento) => {
    evento.preventDefault()
    if (cargando) return
    if (registrando) await register(nombre, correo, clave)
    else await login(correo, clave)
    setClave('')
  }
  if (usuario) return null

  return (
    <Modal show onHide={cerrarLogin} centered backdrop={cargando ? 'static' : true}
      keyboard={!cargando} aria-labelledby="titulo-login">
      <Modal.Header closeButton={!cargando}>
        <Modal.Title id="titulo-login">{registrando ? 'Crear cuenta' : 'Iniciar sesión'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{registrando ? 'Tu cuenta se guardará como cliente.' : 'Ingresa el correo y la contraseña de tu cuenta.'}</p>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={manejarEnvio}>
          {registrando && <Form.Group className="mb-3" controlId="registro-nombre">
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control required maxLength={120} value={nombre} onChange={(evento) => setNombre(evento.target.value)} disabled={cargando} autoComplete="name" />
          </Form.Group>}
          <Form.Group className="mb-3" controlId="login-correo">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control type="email" autoComplete="username" required maxLength={254}
              value={correo} onChange={(evento) => setCorreo(evento.target.value)} disabled={cargando} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="login-clave">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" autoComplete={registrando ? 'new-password' : 'current-password'} required minLength={6} maxLength={128}
              value={clave} onChange={(evento) => setClave(evento.target.value)} disabled={cargando} />
          </Form.Group>
          <Button type="submit" className="btn-tienda" disabled={cargando}>
            {cargando && <Spinner size="sm" className="me-2" aria-hidden="true" />}
            {cargando ? 'Procesando…' : registrando ? 'Registrarme' : 'Entrar'}
          </Button>
          <Button variant="link" disabled={cargando} onClick={() => { setRegistrando(!registrando); setClave('') }}>
            {registrando ? 'Ya tengo cuenta' : 'Crear una cuenta'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
