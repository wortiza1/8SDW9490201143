import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import SeccionHero from '../components/SeccionHero.jsx'
import ProductosGrid from '../components/ProductosGrid.jsx'
import { productosPorCategoria } from '../data/productos.js'

export default function SeccionZapatos({ onAgregar }) {
  const productos = productosPorCategoria('zapatos')
  const destacados = productos.filter((p) => p.destacado)
  const catalogo = productos.filter((p) => !p.destacado)

  return (
    <section id="zapatos">
      <Container>
        <SeccionHero titulo="Zapatos" subtitulo="Calzado con diseños inspirados en tus fandoms favoritos." />

        <ProductosGrid titulo="Productos Destacados" productos={destacados} onAgregar={onAgregar} />
        <ProductosGrid titulo="Catálogo" productos={catalogo} onAgregar={onAgregar} />

        <div className="mb-5">
          <h2 className="titulo-seccion">Guía de Tallas</h2>
          <Table bordered className="bg-white text-center">
            <thead>
              <tr>
                <th>Talla EU</th>
                <th>Talla US</th>
                <th>Longitud (cm)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>38</td><td>6</td><td>24.0</td></tr>
              <tr><td>40</td><td>8</td><td>25.4</td></tr>
              <tr><td>42</td><td>9.5</td><td>26.7</td></tr>
              <tr><td>44</td><td>11</td><td>28.0</td></tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </section>
  )
}
