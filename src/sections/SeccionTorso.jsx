import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion'
import SeccionHero from '../components/SeccionHero.jsx'
import ProductosGrid from '../components/ProductosGrid.jsx'
import { productosPorCategoria } from '../data/productos.js'

export default function SeccionTorso({ onAgregar }) {
  const productos = productosPorCategoria('torso')
  const destacados = productos.filter((p) => p.destacado)
  const catalogo = productos.filter((p) => !p.destacado)

  return (
    <section id="torso">
      <Container>
        <SeccionHero titulo="Torso" subtitulo="Encuentra playeras y sudaderas con diseños únicos." />

        <ProductosGrid titulo="Productos Destacados" productos={destacados} onAgregar={onAgregar} />
        <ProductosGrid titulo="Catálogo" productos={catalogo} onAgregar={onAgregar} />

        <div className="mb-5">
          <h2 className="titulo-seccion">Preguntas Frecuentes</h2>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Guía de cuidado</Accordion.Header>
              <Accordion.Body>
                Lavar a máquina con agua fría, del revés, y evitar la secadora para conservar el estampado.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Métodos de pago</Accordion.Header>
              <Accordion.Body>
                Aceptamos tarjetas de crédito, débito y pago contra entrega en la Ciudad de Guatemala.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Cambios y devoluciones</Accordion.Header>
              <Accordion.Body>
                Cuentas con 7 días desde la compra para solicitar un cambio de talla.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Container>
    </section>
  )
}
