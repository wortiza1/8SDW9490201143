import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Badge from 'react-bootstrap/Badge'

export default function NavbarPrincipal({ totalProductos }) {
  return (
    <Navbar expand="lg" variant="dark" sticky="top" className="navbar-tienda py-3">
      <Container>
        <Navbar.Brand href="#inicio" className="fw-semibold">
          Tienda en Línea
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-tienda" />
        <Navbar.Collapse id="navbar-tienda">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link href="#inicio">Inicio</Nav.Link>
            <Nav.Link href="#torso">Torso</Nav.Link>
            <Nav.Link href="#accesorios">Accesorios</Nav.Link>
            <Nav.Link href="#pantalones">Pantalones</Nav.Link>
            <Nav.Link href="#zapatos">Zapatos</Nav.Link>
            <Nav.Link href="#contacto">Contacto</Nav.Link>
            <Nav.Link href="#carrito">
              🛒 Carrito
              {totalProductos > 0 && (
                <Badge className="badge-tienda ms-2">{totalProductos}</Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
