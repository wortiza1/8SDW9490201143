import { useState } from 'react'
import NavbarPrincipal from './components/NavbarPrincipal.jsx'
import Footer from './components/Footer.jsx'
import SeccionInicio from './sections/SeccionInicio.jsx'
import SeccionTorso from './sections/SeccionTorso.jsx'
import SeccionAccesorios from './sections/SeccionAccesorios.jsx'
import SeccionPantalones from './sections/SeccionPantalones.jsx'
import SeccionZapatos from './sections/SeccionZapatos.jsx'
import SeccionContacto from './sections/SeccionContacto.jsx'
import SeccionCarrito from './sections/SeccionCarrito.jsx'

function App() {
  const [carrito, setCarrito] = useState([])

  const agregarAlCarrito = (producto) => {
    const yaExiste = carrito.find((item) => item.id === producto.id)

    if (yaExiste) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      )
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }])
    }
  }

  const quitarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id))
  }

  const vaciarCarrito = () => setCarrito([])

  const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0)

  return (
    <>
      <NavbarPrincipal totalProductos={totalProductos} />

      <main className="py-2">
        <SeccionInicio onAgregar={agregarAlCarrito} />
        <SeccionTorso onAgregar={agregarAlCarrito} />
        <SeccionAccesorios onAgregar={agregarAlCarrito} />
        <SeccionPantalones onAgregar={agregarAlCarrito} />
        <SeccionZapatos onAgregar={agregarAlCarrito} />
        <SeccionContacto />
        <SeccionCarrito items={carrito} onQuitar={quitarDelCarrito} onVaciar={vaciarCarrito} />
      </main>

      <Footer />
    </>
  )
}

export default App
