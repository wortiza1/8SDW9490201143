# Tienda en Línea — React + Bootstrap

Proyecto académico de Desarrollo Web, 8vo semestre, Universidad Mariano Gálvez de Guatemala.

**Tarea 2:** migración de la Tienda en Línea (HTML/CSS estático de la Tarea 1) a una aplicación de página única construida con **React** y **React-Bootstrap**, aplicando componentización, modularidad y diseño responsivo, sin usar React Router (navegación mediante anclas `#` dentro de una sola página).

## Integrantes

| Nombre | Carné | Módulos aportados |
| --- | --- | --- |
| Werner Josué Ortiz Abdalla | 9490-20-1143 | Estructura general del proyecto (Navbar, Footer, Hero), migración a React + React-Bootstrap, catálogo de productos, carrito de compras (Context API) y sección de contacto. |

## Sitio publicado

🔗 https://PENDIENTE-actualizar-tras-deploy-en-netlify.netlify.app/

## Secciones de la aplicación

- **Inicio** — bienvenida, carrusel de promociones y productos destacados.
- **Torso, Accesorios, Pantalones, Zapatos** — catálogo por categoría con tarjetas de producto (`Card`, `Badge`), modal de detalle (`Modal`, `ListGroup`), y guía de tallas (`Table`) o preguntas frecuentes (`Accordion`) según la categoría.
- **Contacto** — información de contacto y formulario.
- **Carrito** — carrito de compras funcional (`Table`) con estado global vía React Context.

Todas las secciones viven en una sola página (`src/App.jsx`) y se navega entre ellas con enlaces de ancla desde la barra de navegación (`Navbar`) global.

## Tecnologías

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Bootstrap 5](https://getbootstrap.com/) y [React-Bootstrap](https://react-bootstrap.netlify.app/)

## Desarrollo local

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción (carpeta dist/)
```
