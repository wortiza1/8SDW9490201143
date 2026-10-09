import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import { useAuth } from '../context/AuthContext.jsx'
import { NavLink } from 'react-router-dom'

export default function NavbarPrincipal({ totalProductos }) {
  const { usuario, logout, abrirLogin } = useAuth()
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" className="navbar-tienda py-3">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-semibold">
          Tienda en Línea
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-tienda" />
        <Navbar.Collapse id="navbar-tienda">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link as={NavLink} to="/" end eventKey="inicio">Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/torso" eventKey="torso">Torso</Nav.Link>
            <Nav.Link as={NavLink} to="/accesorios" eventKey="accesorios">Accesorios</Nav.Link>
            <Nav.Link as={NavLink} to="/pantalones" eventKey="pantalones">Pantalones</Nav.Link>
            <Nav.Link as={NavLink} to="/zapatos" eventKey="zapatos">Zapatos</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto" eventKey="contacto">Contacto</Nav.Link>
            <Nav.Link as={NavLink} to="/carrito" eventKey="carrito">
              🛒 Carrito
              {totalProductos > 0 && (
                <Badge className="badge-tienda ms-2">{totalProductos}</Badge>
              )}
            </Nav.Link>
            {usuario ? (
              <>
                <Navbar.Text className="mx-lg-2">Hola, {usuario.nombre}</Navbar.Text>
                <Nav.Link as={NavLink} to="/perfil" eventKey="perfil">Mi perfil</Nav.Link>
                {usuario.rol === 'admin' && <Nav.Link as={NavLink} to="/administrar" eventKey="administrar">Administrar</Nav.Link>}
                <Button variant="outline-light" size="sm" onClick={logout}>Cerrar sesión</Button>
              </>
            ) : (
              <Nav.Link as="button" type="button" onClick={abrirLogin} eventKey="login" className="border-0 bg-transparent">Iniciar sesión</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
