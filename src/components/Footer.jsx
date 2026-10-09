import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const integrantes = [
  {
    nombre: 'Werner Josué Ortiz Abdalla',
    carnet: '9490-20-1143',
    modulos: 'Tienda React con Context API + useReducer, páginas y modal de sesión. Tarea 4: API con Express y MongoDB, autenticación real y administración de productos.',
  },
]

export default function Footer() {
  return (
    <footer className="footer-tienda">
      <Container>
        <Row className="gy-4">
          <Col md={5}>
            <h5 className="mb-2">Tienda en Línea</h5>
            <p className="text-body-secondary mb-0">
              Proyecto académico de Desarrollo Web, 8vo semestre, Universidad Mariano Gálvez de Guatemala.
            </p>
          </Col>
          <Col md={7}>
            <h6>Integrantes y aportes</h6>
            {integrantes.map((persona) => (
              <p key={persona.carnet} className="mb-2 small">
                <strong>{persona.nombre}</strong> — Carné {persona.carnet}
                <br />
                {persona.modulos}
              </p>
            ))}
          </Col>
        </Row>
        <hr className="border-secondary" />
        <p className="text-center mb-0 small text-body-secondary">
          &copy; 2026 UMG Tienda en Línea. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  )
}
