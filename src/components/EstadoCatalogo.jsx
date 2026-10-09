import { Alert, Button, Spinner } from 'react-bootstrap'

export default function EstadoCatalogo({ cargando, error, vacio, recargar }) {
  if (cargando) return <p className="text-center py-4" role="status"><Spinner size="sm" className="me-2" />Cargando productos…</p>
  if (error) return <Alert variant="danger">{error} <Button variant="outline-danger" size="sm" onClick={recargar}>Reintentar</Button></Alert>
  if (vacio) return <Alert variant="info">No hay productos para mostrar.</Alert>
  return null
}
