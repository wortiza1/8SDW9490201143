import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion'
import SeccionHero from '../components/SeccionHero.jsx'
import ProductosGrid from '../components/ProductosGrid.jsx'
import useProductos from '../hooks/useProductos.js'
import EstadoCatalogo from '../components/EstadoCatalogo.jsx'

export default function SeccionAccesorios({ onAgregar }) {
  const { productos, cargando, error, recargar } = useProductos('?categoria=accesorios')
  const destacados = productos.filter((p) => p.destacado)
  const catalogo = productos.filter((p) => !p.destacado)

  return (
    <section id="accesorios">
      <Container>
        <EstadoCatalogo cargando={cargando} error={error} vacio={!productos.length} recargar={recargar} />
        {!cargando && !error && <>
          <ProductosGrid titulo="Productos Destacados" productos={destacados} onAgregar={onAgregar} />
          <ProductosGrid titulo="Catálogo" productos={catalogo} onAgregar={onAgregar} />
        </>}

        <div className="mb-5">
          <h2 className="titulo-seccion">Preguntas Frecuentes</h2>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Materiales</Accordion.Header>
              <Accordion.Body>
                Elaborados con acero inoxidable y baño de oro/plata, resistentes al agua y al uso diario.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Garantía</Accordion.Header>
              <Accordion.Body>
                Todos los accesorios cuentan con 30 días de garantía por defectos de fabricación.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Empaque</Accordion.Header>
              <Accordion.Body>
                Cada pieza se entrega en un empaque individual, ideal para regalo.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Container>
    </section>
  )
}
