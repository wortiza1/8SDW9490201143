import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Alert, Badge, Button, Card, Col, Container, Form, Modal, Row, Table, Toast, ToastContainer } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext.jsx'
import useProductos from '../hooks/useProductos.js'
import { apiRequest, imagenUrl } from '../services/api.js'
import EstadoCatalogo from '../components/EstadoCatalogo.jsx'

const vacio = { nombre: '', categoria: 'torso', precio: '', descripcion: '', detalle: '', imagen: '', badge: '', destacado: false }

export default function SeccionAdministrar() {
  const { usuario, token, logout } = useAuth()
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('')
  const { productos, cargando, error, recargar } = useProductos(filtro)
  const [formulario, setFormulario] = useState({ ...vacio })
  const [editarId, setEditarId] = useState(null)
  const [guardando, setGuardando] = useState(false)
  const [errorOperacion, setErrorOperacion] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [porEliminar, setPorEliminar] = useState(null)
  const [archivoImagen, setArchivoImagen] = useState(null)
  const [vistaPrevia, setVistaPrevia] = useState('')
  const [versionSelector, setVersionSelector] = useState(0)

  useEffect(() => {
    if (!archivoImagen) { setVistaPrevia(''); return }
    const url = URL.createObjectURL(archivoImagen)
    setVistaPrevia(url)
    return () => URL.revokeObjectURL(url)
  }, [archivoImagen])

  if (!usuario || usuario.rol !== 'admin') return <Navigate to="/" replace />

  const cambiar = (evento) => {
    const { name, value, type, checked } = evento.target
    setFormulario({ ...formulario, [name]: type === 'checkbox' ? checked : value })
  }
  const limpiarImagen = () => { setArchivoImagen(null); setVersionSelector((actual) => actual + 1) }
  const limpiar = () => { setFormulario({ ...vacio }); setEditarId(null); limpiarImagen() }
  const seleccionarImagen = (evento) => {
    const archivo = evento.target.files[0]
    if (!archivo) { setArchivoImagen(null); return }
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(archivo.type) || archivo.size > 5 * 1024 * 1024) {
      setErrorOperacion('Selecciona una imagen JPG, PNG, WEBP o GIF de hasta 5 MB.')
      evento.target.value = ''
      setArchivoImagen(null)
      return
    }
    setErrorOperacion('')
    setArchivoImagen(archivo)
  }
  const informarError = (fallo) => {
    setErrorOperacion(fallo.message)
    if (fallo.status === 401) logout()
  }
  const guardar = async (evento) => {
    evento.preventDefault()
    setGuardando(true)
    setErrorOperacion('')
    setMensaje('')
    try {
      let imagen = formulario.imagen
      if (archivoImagen) {
        const datosImagen = new FormData()
        datosImagen.append('imagen', archivoImagen)
        const subida = await apiRequest('/imagenes', { method: 'POST', token, body: datosImagen })
        imagen = subida.imagen
        // Si guardar el producto falla, conservamos la ruta para poder reintentar.
        setFormulario((actual) => ({ ...actual, imagen }))
        limpiarImagen()
      }
      await apiRequest('/recursos' + (editarId ? '/' + editarId : ''), {
        method: editarId ? 'PUT' : 'POST', token,
        body: { ...formulario, imagen, precio: Number(formulario.precio) },
      })
      setMensaje(editarId ? 'Producto actualizado.' : 'Producto creado.')
      limpiar()
      recargar()
    } catch (fallo) { informarError(fallo) }
    finally { setGuardando(false) }
  }
  const editar = async (producto) => {
    setGuardando(true)
    setErrorOperacion('')
    setMensaje('')
    try {
      const datos = await apiRequest('/recursos/' + producto.id)
      limpiarImagen()
      setEditarId(datos.id)
      setFormulario(Object.fromEntries(Object.keys(vacio).map((campo) => [campo, datos[campo]])))
      window.scrollTo(0, 0)
    } catch (fallo) { informarError(fallo) }
    finally { setGuardando(false) }
  }
  const eliminar = async () => {
    setGuardando(true)
    setErrorOperacion('')
    setMensaje('')
    try {
      await apiRequest('/recursos/' + porEliminar.id, { method: 'DELETE', token })
      if (editarId === porEliminar.id) limpiar()
      setPorEliminar(null)
      setMensaje('Producto eliminado.')
      recargar()
    } catch (fallo) { informarError(fallo); setPorEliminar(null) }
    finally { setGuardando(false) }
  }

  return (
    <Container className="py-4">
      <h1 className="h3">Administrar productos</h1>
      <ToastContainer position="top-end" className="p-3" style={{ position: 'fixed', zIndex: 1100 }}>
        <Toast show={!!mensaje} onClose={() => setMensaje('')} autohide delay={4000} bg="success">
          <Toast.Header><strong className="me-auto">Acción realizada</strong></Toast.Header>
          <Toast.Body className="text-white">{mensaje}</Toast.Body>
        </Toast>
      </ToastContainer>
      {errorOperacion && <Alert variant="danger">{errorOperacion}</Alert>}
      <Card className="mb-4"><Card.Body>
        <h2 className="h5">{editarId ? 'Editar producto' : 'Nuevo producto'}</h2>
        <Form onSubmit={guardar}>
          <fieldset disabled={guardando}>
            <Row className="g-3">
              <Col md={6}><Form.Group controlId="producto-nombre"><Form.Label>Nombre</Form.Label><Form.Control name="nombre" value={formulario.nombre} onChange={cambiar} required maxLength={120} /></Form.Group></Col>
              <Col md={3}><Form.Group controlId="producto-categoria"><Form.Label>Categoría</Form.Label><Form.Select name="categoria" value={formulario.categoria} onChange={cambiar}>
                <option value="torso">Torso</option><option value="accesorios">Accesorios</option><option value="pantalones">Pantalones</option><option value="zapatos">Zapatos</option>
              </Form.Select></Form.Group></Col>
              <Col md={3}><Form.Group controlId="producto-precio"><Form.Label>Precio (Q)</Form.Label><Form.Control type="number" name="precio" min="0" step="0.01" value={formulario.precio} onChange={cambiar} required /></Form.Group></Col>
              <Col md={12}><Form.Group controlId="producto-descripcion"><Form.Label>Descripción</Form.Label><Form.Control name="descripcion" value={formulario.descripcion} onChange={cambiar} required maxLength={500} /></Form.Group></Col>
              <Col md={12}><Form.Group controlId="producto-detalle"><Form.Label>Detalle</Form.Label><Form.Control as="textarea" rows={3} name="detalle" value={formulario.detalle} onChange={cambiar} maxLength={2000} /></Form.Group></Col>
              <Col md={8}><Form.Group controlId="producto-imagen">
                <Form.Label>Imagen del producto</Form.Label>
                <Form.Control key={versionSelector} type="file" accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={seleccionarImagen} required={!formulario.imagen} />
                <Form.Text>JPG, PNG, WEBP o GIF. Máximo 5 MB.{editarId && ' Si no eliges otra imagen, se conserva la actual.'}</Form.Text>
                {(vistaPrevia || formulario.imagen) && <div className="mt-2">
                  <img src={vistaPrevia || imagenUrl(formulario.imagen)} alt="Vista previa del producto"
                    className="rounded border" style={{ maxWidth: '100%', width: 180, height: 140, objectFit: 'contain' }} />
                </div>}
              </Form.Group></Col>
              <Col md={4}><Form.Group controlId="producto-badge"><Form.Label>Etiqueta</Form.Label><Form.Control name="badge" value={formulario.badge} onChange={cambiar} maxLength={40} /></Form.Group></Col>
              <Col md={12}><Form.Check id="producto-destacado" label="Producto destacado" name="destacado" checked={formulario.destacado} onChange={cambiar} /></Col>
            </Row>
            <div className="d-flex gap-2 mt-3">
              <Button type="submit" className="btn-tienda">{guardando ? 'Procesando…' : editarId ? 'Guardar cambios' : 'Crear producto'}</Button>
              {editarId && <Button variant="secondary" onClick={limpiar}>Cancelar edición</Button>}
            </div>
          </fieldset>
        </Form>
      </Card.Body></Card>
      <Form className="d-flex gap-2 mb-3" onSubmit={(evento) => { evento.preventDefault(); setFiltro('?q=' + encodeURIComponent(busqueda)) }}>
        <Form.Control aria-label="Buscar por nombre" placeholder="Buscar por nombre" maxLength={80} value={busqueda} onChange={(evento) => setBusqueda(evento.target.value)} />
        <Button type="submit" variant="secondary">Buscar</Button>
      </Form>
      <EstadoCatalogo cargando={cargando} error={error} vacio={!productos.length} recargar={recargar} />
      {!cargando && !error && productos.length > 0 && <Table responsive bordered hover className="bg-white align-middle">
        <thead><tr><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Creado</th><th>Acciones</th></tr></thead>
        <tbody>{productos.map((producto) => <tr key={producto.id}>
          <td>{producto.nombre} {producto.destacado && <Badge bg="success">Destacado</Badge>}</td>
          <td>{producto.categoria}</td><td>Q{producto.precio.toFixed(2)}</td>
          <td>{new Date(producto.createdAt).toLocaleDateString('es-GT')}</td>
          <td><div className="d-flex gap-2"><Button size="sm" variant="outline-primary" disabled={guardando} onClick={() => editar(producto)}>Editar</Button><Button size="sm" variant="outline-danger" disabled={guardando} onClick={() => setPorEliminar(producto)}>Eliminar</Button></div></td>
        </tr>)}</tbody>
      </Table>}
      <Modal show={!!porEliminar} onHide={() => setPorEliminar(null)} centered backdrop={guardando ? 'static' : true} keyboard={!guardando}>
        <Modal.Header closeButton={!guardando}><Modal.Title>Eliminar producto</Modal.Title></Modal.Header>
        <Modal.Body>¿Quieres eliminar {porEliminar?.nombre}? Se quitará de la base de datos.</Modal.Body>
        <Modal.Footer><Button variant="secondary" disabled={guardando} onClick={() => setPorEliminar(null)}>Cancelar</Button><Button variant="danger" disabled={guardando} onClick={eliminar}>{guardando ? 'Eliminando…' : 'Eliminar'}</Button></Modal.Footer>
      </Modal>
    </Container>
  )
}
