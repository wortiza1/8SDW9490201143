import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import SeccionHero from '../components/SeccionHero.jsx'

export default function SeccionCarrito({ items, onQuitar, onVaciar }) {
  const totalProductos = items.reduce((total, item) => total + item.cantidad, 0)
  const totalCompra = items.reduce((total, item) => total + item.cantidad * item.precio, 0)

  return (
    <section id="carrito">
      <Container>
        <SeccionHero
          titulo="Carrito de Compras"
          subtitulo="Revisa los productos seleccionados antes de finalizar tu compra."
        />

        <Table bordered hover className="bg-white text-center align-middle">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="fst-italic text-body-secondary py-4">
                  No tienes productos agregados al carrito.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <td className="text-start">{item.nombre}</td>
                  <td>Q{item.precio.toFixed(2)}</td>
                  <td>{item.cantidad}</td>
                  <td>Q{(item.precio * item.cantidad).toFixed(2)}</td>
                  <td>
                    <Button variant="outline-danger" size="sm" onClick={() => onQuitar(item.id)}>
                      Quitar
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <Card className="mb-5 ms-auto" style={{ maxWidth: 380 }}>
          <Card.Body className="text-end">
            <Card.Title>Resumen de Compra</Card.Title>
            <p className="mb-1"><strong>Productos:</strong> {totalProductos}</p>
            <p className="mb-3"><strong>Total:</strong> Q{totalCompra.toFixed(2)}</p>
            <div className="d-flex justify-content-end gap-2">
              {items.length > 0 && (
                <Button variant="outline-secondary" onClick={onVaciar}>
                  Vaciar carrito
                </Button>
              )}
              <Button className="btn-tienda" disabled={items.length === 0}>
                Finalizar Compra
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </section>
  )
}
