import Container from 'react-bootstrap/Container'
import Carousel from 'react-bootstrap/Carousel'
import SeccionHero from '../components/SeccionHero.jsx'
import ProductosGrid from '../components/ProductosGrid.jsx'
import useProductos from '../hooks/useProductos.js'
import EstadoCatalogo from '../components/EstadoCatalogo.jsx'

const promociones = [
  { imagen: '/img/producto3.jpg', titulo: 'Colección Gamer', texto: 'Playeras inspiradas en tus videojuegos favoritos.' },
  { imagen: '/img/zapato1.jfif', titulo: 'Edición Especial', texto: 'Calzado inspirado en el mundo mágico de Hogwarts.' },
  { imagen: '/img/acc1.jfif', titulo: 'Accesorios Elegantes', texto: 'Complementa tu estilo con nuestra línea de accesorios.' },
]

export default function SeccionInicio({ onAgregar }) {
  const { productos, cargando, error, recargar } = useProductos('?destacado=true')
  return (
    <section id="inicio">
      <Container>


        <Carousel className="carrusel-inicio mb-5">
          {promociones.map((promo) => (
            <Carousel.Item key={promo.titulo}>
              <img className="d-block w-100" src={promo.imagen} alt={promo.titulo} />
              <Carousel.Caption>
                <h3>{promo.titulo}</h3>
                <p>{promo.texto}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        <EstadoCatalogo cargando={cargando} error={error} vacio={!productos.length} recargar={recargar} />
        {!cargando && !error && <ProductosGrid titulo="Productos Destacados" productos={productos} onAgregar={onAgregar} />}
      </Container>
    </section>
  )
}
