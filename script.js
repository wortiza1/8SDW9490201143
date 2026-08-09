const fondo = document.getElementById("fondo");

let posicion = 0;

function moverImagen() {
    if (!fondo) return;

    const hero = fondo.parentElement;
    const overflow = fondo.offsetWidth - hero.offsetWidth;

    if (overflow <= 0) return; 

    const duracion = 30000; 
    let inicio = null;

    function animar(timestamp) {
        if (!inicio) inicio = timestamp;
        const transcurrido = timestamp - inicio;
        const progreso = Math.min(transcurrido / duracion, 1);

        
        const posicion = -overflow + (overflow * progreso);
        fondo.style.transform = `translateX(${posicion}px)`;

        if (progreso < 1) {
            requestAnimationFrame(animar);
        }
    }

    requestAnimationFrame(animar);
}

if (fondo) {
    moverImagen();
}


const imagenesGaleria = document.querySelectorAll(".imagen-galeria");
const modal = document.getElementById("modal");
const imagenModal = document.getElementById("imagenModal");
const descripcionModal = document.getElementById("descripcionModal");
const cerrarModal = document.getElementById("cerrarModal");

imagenesGaleria.forEach(function(imagen) {
    imagen.addEventListener("click", function() {
        imagenModal.src = imagen.src;
        imagenModal.alt = imagen.alt;
        descripcionModal.textContent = imagen.alt;
        modal.classList.add("mostrar");
    });
});

if (cerrarModal) {
    cerrarModal.addEventListener("click", function() {
        modal.classList.remove("mostrar");
    });
}

if (modal) {
    modal.addEventListener("click", function(evento) {
        if (evento.target === modal) {
            modal.classList.remove("mostrar");
        }
    });
}


const botonCalcular = document.getElementById("calcularTotal");

if (botonCalcular) {
    botonCalcular.addEventListener("click", function() {

        const asistentes = parseInt(document.getElementById("asistentes").value);
        const paquete = document.getElementById("paquete").value;
        const resultado = document.getElementById("resultadoCotizacion");

        if (!asistentes || asistentes < 1 || paquete === "") {
            resultado.textContent = "Por favor, completa los datos de la cotización.";
            return;
        }

        let precioPaquete = 0;

        if (paquete === "basico") {
            precioPaquete = 500;
        } else if (paquete === "aventura") {
            precioPaquete = 750;
        } else if (paquete === "premium") {
            precioPaquete = 1000;
        }

        let adicionales = 0;

        if (document.getElementById("transporte").checked) {
            adicionales += 100;
        }

        if (document.getElementById("alimentacion").checked) {
            adicionales += 150;
        }

        if (document.getElementById("equipo").checked) {
            adicionales += 75;
        }

        const total = (precioPaquete + adicionales) * asistentes;

        resultado.textContent = "Precio total estimado: Q" + total.toFixed(2);
    });
}


const buscador = document.getElementById("buscadorActividades");
const listaActividades = document.querySelectorAll("#listaActividades li");

if (buscador) {
    buscador.addEventListener("input", function() {

        const texto = buscador.value.toLowerCase();

        listaActividades.forEach(function(actividad) {

            const nombreActividad = actividad.textContent.toLowerCase();

            if (nombreActividad.includes(texto)) {
                actividad.classList.remove("oculto");
            } else {
                actividad.classList.add("oculto");
            }

        });
    });
}


const nombres = [
    "Ana Gómez",
    "Carlos López",
    "María Rodríguez",
    "Juan Pérez",
    "Sofía Martínez"
];

const comentarios = [
    "La excursión fue una experiencia increíble y muy divertida.",
    "Cartagena es un lugar hermoso y disfrutamos mucho el recorrido.",
    "Me encantó conocer la ciudad amurallada y sus lugares históricos.",
    "El viaje estuvo muy bien organizado y fue una experiencia inolvidable.",
    "Disfrutamos mucho las actividades y esperamos volver pronto."
];

const nombreResena = document.getElementById("nombreResena");
const comentarioResena = document.getElementById("comentarioResena");
const nuevaResena = document.getElementById("nuevaResena");

function mostrarResena() {

    const posicionAleatoria = Math.floor(Math.random() * nombres.length);

    if (nombreResena && comentarioResena) {
        nombreResena.textContent = nombres[posicionAleatoria];
        comentarioResena.textContent = comentarios[posicionAleatoria];
    }
}

if (nombreResena && comentarioResena) {
    mostrarResena();
}

if (nuevaResena) {
    nuevaResena.addEventListener("click", mostrarResena);
}


const formReservacion = document.getElementById("formReservacion");

if (formReservacion) {
    formReservacion.addEventListener("submit", function(evento) {

        evento.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const personas = document.getElementById("personas").value.trim();
        const fecha = document.getElementById("fecha").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();
        const confirmacion = document.getElementById("mensajeConfirmacion");

        if (
            nombre === "" ||
            correo === "" ||
            personas === "" ||
            fecha === "" ||
            mensaje === ""
        ) {
            confirmacion.textContent = "Por favor, completa todos los campos.";
            return;
        }

        confirmacion.textContent =
            "¡Gracias " + nombre +
            ", tu solicitud para " + personas +
            " personas ha sido registrada!";

        formReservacion.reset();
    });
}