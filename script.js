const catalogo = [
    { id: 1, nombre: "Alimento Premium Pro", categoria: "Nutrición", precio: 75.00, imagen: "https://unsplash.com" },
    { id: 2, nombre: "Vitaminas Vitality", categoria: "Farmacia", precio: 32.00, imagen: "https://unsplash.com" },
    { id: 3, nombre: "Arnés Ergonómico", categoria: "Accesorios", precio: 22.50, imagen: "https://unsplash.com" }
];

const renderizar = (lista) => {
    const contenedor = document.getElementById('grid-productos');
    const template = document.getElementById('item-producto').content;
    contenedor.innerHTML = '';

    lista.forEach(item => {
        const clon = template.cloneNode(true);
        clon.querySelector('.producto-nombre').textContent = item.nombre;
        clon.querySelector('.producto-etiqueta').textContent = item.categoria;
        clon.querySelector('.producto-precio').textContent = `$${item.precio.toFixed(2)}`;
        clon.querySelector('.producto-img').src = item.imagen;
        contenedor.appendChild(clon);
    });
};

document.getElementById('mobile-menu').addEventListener('click', () => {
    document.getElementById('nav-list').classList.toggle('active');
});


function filtrar(cat) {
    if (cat === 'Todos') return renderizar(catalogo);
    const filtrados = catalogo.filter(p => p.categoria === cat);
    renderizar(filtrados);
}

document.addEventListener('DOMContentLoaded', () => renderizar(catalogo));

function enviarFormulario() {
    let nombre = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;
    let correo = document.getElementById("correo").value;
    let servicio = document.getElementById("servicio").value;

    if(nombre === "" || telefono === "" || correo === "" || servicio === "") {
        alert("Por favor, completa todos los campos con asterisco (*)");
        return;
    }

    alert("¡Gracias, " + nombre + "! Nos pondremos en contacto pronto.");
}
const catalogo = [
    { id: 1, nombre: "Alimento Premium Pro", categoria: "Nutrición", precio: 75.00, imagen: "https://unsplash.com" },
    { id: 2, nombre: "Vitaminas Vitality", categoria: "Farmacia", precio: 32.00, imagen: "https://unsplash.com" },
    { id: 3, nombre: "Arnés Ergonómico", categoria: "Accesorios", precio: 22.50, imagen: "https://unsplash.com" }
];

const renderizar = (lista) => {
    const contenedor = document.getElementById('grid-productos');
    const template = document.getElementById('item-producto').content;
    contenedor.innerHTML = ''; // Limpiar antes de cargar

    lista.forEach(item => {
        const clon = template.cloneNode(true);
        clon.querySelector('.producto-nombre').textContent = item.nombre;
        clon.querySelector('.producto-etiqueta').textContent = item.categoria;
        clon.querySelector('.producto-precio').textContent = `$${item.precio.toFixed(2)}`;
        clon.querySelector('.producto-img').src = item.imagen;
        contenedor.appendChild(clon);
    });
};

// Menú Hamburguesa
document.getElementById('mobile-menu').addEventListener('click', () => {
    document.getElementById('nav-list').classList.toggle('active');
});

// Filtros
function filtrar(cat) {
    if (cat === 'Todos') return renderizar(catalogo);
    const filtrados = catalogo.filter(p => p.categoria === cat);
    renderizar(filtrados);
}

document.addEventListener('DOMContentLoaded', () => renderizar(catalogo));
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;

// Mostrar slide actual
function showSlide(i) {
    slides.forEach((slide, iSlide) => {
        slide.classList.remove("active");
    });

    slides[i].classList.add("active");
}

// Botón siguiente
nextBtn.addEventListener("click", () => {
    index++;
    if (index >= slides.length) {
        index = 0;
    }
    showSlide(index);
});

// Botón anterior
prevBtn.addEventListener("click", () => {
    index--;
    if (index < 0) {
        index = slides.length - 1;
    }
    showSlide(index);
});

// Cambio automático cada 5 segundos
setInterval(() => {
    index++;
    if (index >= slides.length) {
        index = 0;
    }
    showSlide(index);
}, 5000);