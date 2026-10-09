import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProductoCard from './ProductoCard.jsx'

export default function ProductosGrid({ titulo, productos, onAgregar }) {
  return (
    <div className="mb-4">
      {titulo && <h2 className="titulo-seccion">{titulo}</h2>}
      <Row xs={1} sm={2} lg={3} className="g-4">
        {productos.map((producto) => (
          <Col key={producto.id}>
            <ProductoCard producto={producto} onAgregar={onAgregar} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
