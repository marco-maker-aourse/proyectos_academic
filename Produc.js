const catalogo = [
    { 
        id: 1, 
        nombre: "Alimento Premium", 
        categoria: "Nutrición", 
        precio: 75.00, 
        imagen: "imagenes/alim.png" 
    },
    { 
        id: 2, 
        nombre: "Arnés de Paseo", 
        categoria: "Accesorios", 
        precio: 22.50, 
        imagen: "imagenes/arnes.jpg" 
    },
    { 
        id: 3, 
        nombre: "Kit Higiene", 
        categoria: "Farmacia", 
        precio: 15.90, 
        imagen: "imagenes/higene.jpg" 
    },
    { 
        id: 4, 
        nombre: "Juguete Interactivo", 
        categoria: "Accesorios", 
        precio: 12.00, 
        imagen: "imagenes/juegete.png" 
    }
];

const renderizar = (lista) => {
    const contenedor = document.getElementById('grid-productos');
    const template = document.getElementById('item-producto').content;
    contenedor.innerHTML = ''; 

    lista.forEach(item => {
        const clon = template.cloneNode(true);
        clon.querySelector('.producto-nombre').textContent = item.nombre;
        clon.querySelector('.producto-etiqueta').textContent = item.categoria;
        clon.querySelector('.producto-precio').textContent = `S/ ${item.precio.toFixed(2)}`;
        clon.querySelector('.producto-img').src = item.imagen;
        clon.querySelector('.producto-img').alt = item.nombre;
        contenedor.appendChild(clon);
    });
};

document.getElementById('mobile-menu').addEventListener('click', () => {
    document.getElementById('nav-list').classList.toggle('active');
});

window.filtrar = (cat) => {
    if (cat === 'Todos') {
        renderizar(catalogo);
    } else {
        const filtrados = catalogo.filter(p => p.categoria === cat);
        renderizar(filtrados);
    }
    document.getElementById('nav-list').classList.remove('active');
};

document.addEventListener('DOMContentLoaded', () => renderizar(catalogo));
