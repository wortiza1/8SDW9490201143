// Catálogo de productos de la tienda, agrupado por categoría.
// Los precios son referenciales (GTQ) para poder simular el carrito de compras.

export const categorias = [
  { id: 'torso', nombre: 'Torso', subtitulo: 'Playeras y sudaderas con diseños únicos' },
  { id: 'accesorios', nombre: 'Accesorios', subtitulo: 'Aretes, pulseras y collares para cualquier ocasión' },
  { id: 'pantalones', nombre: 'Pantalones', subtitulo: 'Gabardinas, jeans y pants para el día a día' },
  { id: 'zapatos', nombre: 'Zapatos', subtitulo: 'Calzado con diseños inspirados en tus fandoms favoritos' },
]

export const productos = [
  // Torso
  { id: 't1', categoria: 'torso', nombre: 'Playera Control NES', imagen: '/img/producto1.jfif', precio: 120, badge: 'Retro', destacado: true, descripcion: 'Diseño clásico inspirado en videojuegos retro.', detalle: 'Playera 100% algodón con estampado serigrafiado de alta durabilidad.' },
  { id: 't2', categoria: 'torso', nombre: 'Playera Control Colores', imagen: '/img/producto2.jfif', precio: 120, badge: 'Popular', destacado: true, descripcion: 'Playera moderna con estampado colorido.', detalle: 'Corte unisex y tela transpirable, ideal para uso diario.' },
  { id: 't3', categoria: 'torso', nombre: 'Playera TBOI', imagen: '/img/producto3.jpg', precio: 130, badge: 'Gamer', destacado: true, descripcion: 'Ideal para fanáticos de The Binding of Isaac.', detalle: 'Estampado de alta resolución que no se decolora con el lavado.' },
  { id: 't4', categoria: 'torso', nombre: 'Playera Rick Sanchez', imagen: '/img/producto4.jfif', precio: 125, badge: 'Nuevo', descripcion: 'Playera con estampado de Rick and Morty.', detalle: 'Tela suave de algodón peinado con acabado mate.' },
  { id: 't5', categoria: 'torso', nombre: 'Playera Rick and Morty', imagen: '/img/producto5.jfif', precio: 125, descripcion: 'Diseño exclusivo para fanáticos.', detalle: 'Edición limitada con empaque individual.' },
  { id: 't6', categoria: 'torso', nombre: 'Sudadera Gryffindor', imagen: '/img/producto6.jfif', precio: 220, badge: 'Abrigo', descripcion: 'Comodidad y estilo para cualquier ocasión.', detalle: 'Interior afelpado, ideal para climas fríos.' },
  { id: 't7', categoria: 'torso', nombre: 'Sudadera Hogwarts', imagen: '/img/producto7.jfif', precio: 220, descripcion: 'Perfecta para los fanáticos de Harry Potter.', detalle: 'Bolsillo canguro y capucha ajustable con cordón.' },

  // Accesorios
  { id: 'a1', categoria: 'accesorios', nombre: 'Aretes Dorado y Perlas', imagen: '/img/acc1.jfif', precio: 85, badge: 'Elegante', destacado: true, descripcion: 'Elegancia para cualquier ocasión.', detalle: 'Baño de oro 14k, hipoalergénicos.' },
  { id: 'a2', categoria: 'accesorios', nombre: 'Juego de Pulseras', imagen: '/img/acc2.webp', precio: 65, destacado: true, descripcion: 'Diseño moderno y juvenil.', detalle: 'Set de 3 piezas, material resistente y cómodo.' },
  { id: 'a3', categoria: 'accesorios', nombre: 'Pulseras de Colores', imagen: '/img/acc3.webp', precio: 55, badge: 'Juvenil', destacado: true, descripcion: 'Combinan con cualquier estilo.', detalle: 'Perfectas para uso diario, ajustables.' },
  { id: 'a4', categoria: 'accesorios', nombre: 'Conjunto de Aretes Premium', imagen: '/img/acc4.webp', precio: 90, descripcion: 'Accesorio con acabado premium.', detalle: 'Incluye estuche de regalo.' },
  { id: 'a5', categoria: 'accesorios', nombre: 'Conjunto de Aretes Sofisticado', imagen: '/img/acc5.webp', precio: 78, descripcion: 'Diseño elegante y sofisticado.', detalle: 'Broche de mariposa para mayor seguridad.' },
  { id: 'a6', categoria: 'accesorios', nombre: 'Pulsera Dorada', imagen: '/img/acc6.webp', precio: 70, badge: 'Brillante', descripcion: 'Estilo moderno con acabado brillante.', detalle: 'Cierre de broche de langosta ajustable.' },
  { id: 'a7', categoria: 'accesorios', nombre: 'Collar Diferentes Joyas', imagen: '/img/acc7.webp', precio: 95, descripcion: 'Ideal para complementar cualquier look.', detalle: 'Cadena de 45 cm con dije intercambiable.' },

  // Pantalones
  { id: 'p1', categoria: 'pantalones', nombre: 'Pantalón Negro Gabardina', imagen: '/img/pantalon1.jfif', precio: 180, badge: 'Formal', destacado: true, descripcion: 'Diseño elegante para cualquier ocasión.', detalle: 'Tela de gabardina con planchado permanente.' },
  { id: 'p2', categoria: 'pantalones', nombre: 'Pantalón Azul Jeans', imagen: '/img/pantalon2.jfif', precio: 165, destacado: true, descripcion: 'Comodidad y estilo para el uso diario.', detalle: 'Mezclilla stretch para mayor movilidad.' },
  { id: 'p3', categoria: 'pantalones', nombre: 'Pantalón Oliva Gabardina', imagen: '/img/pantalon3.jfif', precio: 180, badge: 'Casual', destacado: true, descripcion: 'Ideal para un look moderno.', detalle: 'Corte slim fit con bolsillos funcionales.' },
  { id: 'p4', categoria: 'pantalones', nombre: 'Pantalón Beige Gabardina', imagen: '/img/pantalon4.avif', precio: 175, descripcion: 'Versátil y cómodo para cualquier ocasión.', detalle: 'Combina fácilmente con cualquier prenda superior.' },
  { id: 'p5', categoria: 'pantalones', nombre: 'Pants Negro', imagen: '/img/pantalon5.jfif', precio: 140, badge: 'Deportivo', descripcion: 'Ideal para actividades deportivas.', detalle: 'Tela ligera de secado rápido con puños elásticos.' },
  { id: 'p6', categoria: 'pantalones', nombre: 'Pants Caqui', imagen: '/img/pantalon6.jfif', precio: 140, descripcion: 'Ideal para el uso diario.', detalle: 'Cintura elástica con cordón ajustable.' },
  { id: 'p7', categoria: 'pantalones', nombre: 'Pantalón Beige', imagen: '/img/pantalon5.webp', precio: 170, descripcion: 'Diseño moderno y elegante.', detalle: 'Tela con ligero stretch para mayor comodidad.' },

  // Zapatos
  { id: 'z1', categoria: 'zapatos', nombre: 'Zapato Harry Potter', imagen: '/img/zapato1.jfif', precio: 260, badge: 'Edición especial', destacado: true, descripcion: 'Inspirado en el mundo mágico de Hogwarts.', detalle: 'Suela antideslizante y plantilla acolchada.' },
  { id: 'z2', categoria: 'zapatos', nombre: 'Zapato Kimetsu no Yaiba', imagen: '/img/zapato2.jfif', precio: 260, destacado: true, descripcion: 'Diseño exclusivo para fanáticos del anime.', detalle: 'Malla transpirable con estampado de alta calidad.' },
  { id: 'z3', categoria: 'zapatos', nombre: 'Zapato Akatsuki', imagen: '/img/zapato3.jfif', precio: 260, badge: 'Anime', destacado: true, descripcion: 'Estilo moderno inspirado en Naruto.', detalle: 'Amortiguación media y agarre reforzado.' },
  { id: 'z4', categoria: 'zapatos', nombre: 'Zapato DBZ', imagen: '/img/zapato4.jfif', precio: 255, descripcion: 'Diseño inspirado en Dragon Ball Z.', detalle: 'Cordones planos y refuerzo en talón.' },
  { id: 'z5', categoria: 'zapatos', nombre: 'Zapato Kimetsu no Yaiba (Deportivo)', imagen: '/img/zapato5.jfif', precio: 265, badge: 'Deportivo', descripcion: 'Modelo deportivo de edición especial.', detalle: 'Diseñado para uso casual y actividad ligera.' },
  { id: 'z6', categoria: 'zapatos', nombre: 'Zapato 7 Deadly Sins', imagen: '/img/zapato6.jfif', precio: 260, descripcion: 'Diseño exclusivo inspirado en el anime.', detalle: 'Edición limitada con caja coleccionable.' },
]

export const productosDestacados = productos.filter((p) => p.destacado)

export function productosPorCategoria(categoria) {
  return productos.filter((p) => p.categoria === categoria)
}
