import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ListGroup from 'react-bootstrap/ListGroup'

export default function ProductoCard({ producto, onAgregar }) {
  const [mostrarModal, setMostrarModal] = useState(false)

  return (
    <>
      <Card className="tarjeta-producto">
        <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-1">
            <Card.Title className="mb-0">{producto.nombre}</Card.Title>
            {producto.badge && <Badge className="badge-tienda">{producto.badge}</Badge>}
          </div>
          <Card.Text className="text-body-secondary flex-grow-1">{producto.descripcion}</Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-semibold">Q{producto.precio.toFixed(2)}</span>
            <Button variant="outline-secondary" size="sm" onClick={() => setMostrarModal(true)}>
              Ver producto
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{producto.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded mb-3" />
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Categoría:</strong> {producto.categoria}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Precio:</strong> Q{producto.precio.toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Detalle:</strong> {producto.detalle}
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Cerrar
          </Button>
          <Button
            className="btn-tienda"
            onClick={() => {
              onAgregar(producto)
              setMostrarModal(false)
            }}
          >
            Agregar al carrito
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
