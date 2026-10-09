import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Alert, Badge, Button, Card, Container, ListGroup, Spinner } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext.jsx'
import { apiRequest } from '../services/api.js'

export default function SeccionPerfil() {
  const { usuario, token, logout } = useAuth()
  const [perfil, setPerfil] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [version, setVersion] = useState(0)

  useEffect(() => {
    if (!token) return
    let activo = true
    setCargando(true)
    setError('')
    apiRequest('/auth/me', { token })
      .then((datos) => { if (activo) setPerfil(datos.usuario) })
      .catch((fallo) => {
        if (activo) {
          setError(fallo.message)
          if (fallo.status === 401) logout()
        }
      })
      .finally(() => { if (activo) setCargando(false) })
    return () => { activo = false }
    // logout borra la sesión; solo se consulta de nuevo al cambiar token o reintentar.
  }, [token, version])

  if (!usuario) return <Navigate to="/" replace />

  return (
    <Container className="py-4">
      <Card className="mx-auto shadow-sm" style={{ maxWidth: 520 }}><Card.Body>
        <h1 className="h4">Mi perfil</h1>
        {cargando && <p role="status"><Spinner size="sm" /> Cargando perfil…</p>}
        {error && <Alert variant="danger">{error} <Button variant="outline-danger" size="sm" onClick={() => setVersion(version + 1)}>Reintentar</Button></Alert>}
        {!cargando && !error && perfil && <ListGroup variant="flush" className="mb-3">
          <ListGroup.Item><strong>Nombre:</strong> {perfil.nombre}</ListGroup.Item>
          <ListGroup.Item><strong>Correo:</strong> {perfil.correo}</ListGroup.Item>
          <ListGroup.Item><strong>Rol:</strong> <Badge bg={perfil.rol === 'admin' ? 'primary' : 'secondary'}>{perfil.rol}</Badge></ListGroup.Item>
          <ListGroup.Item><strong>Registrado:</strong> {new Date(perfil.createdAt).toLocaleString('es-GT')}</ListGroup.Item>
          <ListGroup.Item><strong>Actualizado:</strong> {new Date(perfil.updatedAt).toLocaleString('es-GT')}</ListGroup.Item>
        </ListGroup>}
        <Button variant="outline-danger" onClick={logout}>Cerrar sesión</Button>
      </Card.Body></Card>
    </Container>
  )
}
