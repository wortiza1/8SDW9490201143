import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import NavbarPrincipal from './components/NavbarPrincipal.jsx'
import Footer from './components/Footer.jsx'
import SeccionInicio from './sections/SeccionInicio.jsx'
import SeccionTorso from './sections/SeccionTorso.jsx'
import SeccionAccesorios from './sections/SeccionAccesorios.jsx'
import SeccionPantalones from './sections/SeccionPantalones.jsx'
import SeccionZapatos from './sections/SeccionZapatos.jsx'
import SeccionContacto from './sections/SeccionContacto.jsx'
import SeccionCarrito from './sections/SeccionCarrito.jsx'
import SeccionLogin from './sections/SeccionLogin.jsx'
import SeccionPerfil from './sections/SeccionPerfil.jsx'
import { useAuth } from './context/AuthContext.jsx'
import SeccionAdministrar from './sections/SeccionAdministrar.jsx'

function App() {
  const [carrito, setCarrito] = useState([])
  const { mostrarLogin } = useAuth()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

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
      {mostrarLogin && <SeccionLogin />}

      <main className="py-2">
        {/* Routes muestra únicamente la página que corresponde a la URL. */}
        <Routes>
          <Route path="/" element={<SeccionInicio onAgregar={agregarAlCarrito} />} />
          <Route path="/torso" element={<SeccionTorso onAgregar={agregarAlCarrito} />} />
          <Route path="/accesorios" element={<SeccionAccesorios onAgregar={agregarAlCarrito} />} />
          <Route path="/pantalones" element={<SeccionPantalones onAgregar={agregarAlCarrito} />} />
          <Route path="/zapatos" element={<SeccionZapatos onAgregar={agregarAlCarrito} />} />
          <Route path="/contacto" element={<SeccionContacto />} />
          <Route path="/carrito" element={<SeccionCarrito items={carrito} onQuitar={quitarDelCarrito} onVaciar={vaciarCarrito} />} />
          <Route path="/perfil" element={<SeccionPerfil />} />
          <Route path="/administrar" element={<SeccionAdministrar />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
