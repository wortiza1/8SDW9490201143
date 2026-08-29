import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Alert from 'react-bootstrap/Alert'
import SeccionHero from '../components/SeccionHero.jsx'

const datosContacto = [
  { icono: '📍', titulo: 'Dirección', valor: 'Ciudad de Guatemala' },
  { icono: '📞', titulo: 'Teléfono', valor: '+502 1234-5678' },
  { icono: '📧', titulo: 'Correo Electrónico', valor: 'contacto@miumg.edu.gt' },
]

const horario = [
  'Lunes a Viernes: 8:00 AM - 5:00 PM',
  'Sábado: 8:00 AM - 12:00 PM',
  'Domingo: Cerrado',
]

export default function SeccionContacto() {
  const [enviado, setEnviado] = useState(false)

  const manejarEnvio = (evento) => {
    evento.preventDefault()
    setEnviado(true)
  }

  return (
    <section id="contacto">
      <Container>
        <SeccionHero
          titulo="Contáctanos"
          subtitulo="Si tienes dudas, sugerencias o necesitas ayuda, puedes comunicarte con nosotros."
        />

        <Row className="g-4 mb-5">
          <Col md={5}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <Card.Title>Información de Contacto</Card.Title>
                <ListGroup variant="flush" className="mb-3">
                  {datosContacto.map((dato) => (
                    <ListGroup.Item key={dato.titulo}>
                      <strong>{dato.icono} {dato.titulo}:</strong> {dato.valor}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <h6 className="text-body-secondary">🕒 Horario de Atención</h6>
                <ListGroup variant="flush">
                  {horario.map((linea) => (
                    <ListGroup.Item key={linea}>{linea}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col md={7}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <Card.Title className="mb-3">Envíanos un Mensaje</Card.Title>
                {enviado && (
                  <Alert variant="success" onClose={() => setEnviado(false)} dismissible>
                    ¡Gracias! Tu mensaje ha sido enviado.
                  </Alert>
                )}
                <Form onSubmit={manejarEnvio}>
                  <Form.Group className="mb-3" controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su nombre" required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="correo">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control type="email" placeholder="correo@ejemplo.com" required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="asunto">
                    <Form.Label>Asunto</Form.Label>
                    <Form.Control type="text" placeholder="Asunto" required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="mensaje">
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="Escriba su mensaje" required />
                  </Form.Group>
                  <Button type="submit" className="btn-tienda">
                    Enviar Mensaje
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
