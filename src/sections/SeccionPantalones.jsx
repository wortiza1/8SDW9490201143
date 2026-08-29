import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import SeccionHero from '../components/SeccionHero.jsx'
import ProductosGrid from '../components/ProductosGrid.jsx'
import { productosPorCategoria } from '../data/productos.js'

export default function SeccionPantalones({ onAgregar }) {
  const productos = productosPorCategoria('pantalones')
  const destacados = productos.filter((p) => p.destacado)
  const catalogo = productos.filter((p) => !p.destacado)

  return (
    <section id="pantalones">
      <Container>
        <SeccionHero titulo="Pantalones" subtitulo="Gabardinas, jeans y pants para el día a día." />

        <ProductosGrid titulo="Productos Destacados" productos={destacados} onAgregar={onAgregar} />
        <ProductosGrid titulo="Catálogo" productos={catalogo} onAgregar={onAgregar} />

        <div className="mb-5">
          <h2 className="titulo-seccion">Guía de Tallas</h2>
          <Table bordered className="bg-white text-center">
            <thead>
              <tr>
                <th>Talla</th>
                <th>Cintura (in)</th>
                <th>Cadera (in)</th>
                <th>Largo (in)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>S</td><td>28 - 30</td><td>36 - 38</td><td>39</td></tr>
              <tr><td>M</td><td>31 - 33</td><td>39 - 41</td><td>40</td></tr>
              <tr><td>L</td><td>34 - 36</td><td>42 - 44</td><td>41</td></tr>
              <tr><td>XL</td><td>37 - 39</td><td>45 - 47</td><td>42</td></tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </section>
  )
}
