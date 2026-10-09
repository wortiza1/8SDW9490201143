import { useState } from 'react'
import { Alert, Badge, Button, Card, ListGroup, Modal, Spinner } from 'react-bootstrap'
import { apiRequest, imagenUrl } from '../services/api.js'

export default function ProductoCard({ producto, onAgregar }) {
  const [mostrarModal, setMostrarModal] = useState(false)
  const [detalle, setDetalle] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const abrirDetalle = async () => {
    setMostrarModal(true)
    setCargando(true)
    setDetalle(null)
    setError('')
    try {
      setDetalle(await apiRequest('/recursos/' + producto.id))
    } catch (fallo) { setError(fallo.message) }
    finally { setCargando(false) }
  }

  return (
    <>
      <Card className="tarjeta-producto">
        <Card.Img variant="top" src={imagenUrl(producto.imagen)} alt={producto.nombre} />
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-1">
            <Card.Title className="mb-0">{producto.nombre}</Card.Title>
            {producto.badge && <Badge className="badge-tienda">{producto.badge}</Badge>}
          </div>
          <Card.Text className="text-body-secondary flex-grow-1">{producto.descripcion}</Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-semibold">Q{producto.precio.toFixed(2)}</span>
            <Button variant="outline-secondary" size="sm" onClick={abrirDetalle}>Ver producto</Button>
          </div>
        </Card.Body>
      </Card>
      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>{detalle?.nombre || producto.nombre}</Modal.Title></Modal.Header>
        <Modal.Body>
          {cargando && <p role="status"><Spinner size="sm" /> Cargando detalle…</p>}
          {error && <Alert variant="danger">{error} <Button variant="outline-danger" size="sm" onClick={abrirDetalle}>Reintentar</Button></Alert>}
          {!cargando && !error && detalle && <>
            <img src={imagenUrl(detalle.imagen)} alt={detalle.nombre} className="img-fluid rounded mb-3" />
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Categoría:</strong> {detalle.categoria}</ListGroup.Item>
              <ListGroup.Item><strong>Precio:</strong> Q{detalle.precio.toFixed(2)}</ListGroup.Item>
              <ListGroup.Item><strong>Detalle:</strong> {detalle.detalle}</ListGroup.Item>
              <ListGroup.Item><strong>Actualizado:</strong> {new Date(detalle.updatedAt).toLocaleDateString('es-GT')}</ListGroup.Item>
            </ListGroup>
          </>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>Cerrar</Button>
          <Button className="btn-tienda" disabled={cargando || !detalle || !!error}
            onClick={() => { onAgregar(detalle); setMostrarModal(false) }}>Agregar al carrito</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
