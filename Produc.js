const catalogo = [
    { id: 1, nombre: "Alimento Premium", categoria: "Nutrición", precio: 75.00, imagen: "imagenes/alim.png" },
    { id: 2, nombre: "Arnés de Paseo", categoria: "Accesorios", precio: 22.50, imagen: "imagenes/arnes.jpg" },
    { id: 3, nombre: "Kit Higiene", categoria: "Farmacia", precio: 15.90, imagen: "imagenes/higene.jpg" },
    { id: 4, nombre: "Alimento chicken", categoria: "Nutrición", precio: 55.00, imagen: "imagenes/aliment1.jpg" },
    { id: 5, nombre: "Alimento", categoria: "Nutrición", precio: 45.00, imagen: "imagenes/aliment2.jpg" },
    { id: 6, nombre: "Shampoo", categoria: "Farmacia", precio: 12.00, imagen: "imagenes/famac1.png" },
    { id: 7, nombre: "Shampoo Medicado", categoria: "Farmacia", precio: 15.00, imagen: "imagenes/farmac2.jpg" },
    { id: 8, nombre: "Peluche", categoria: "Accesorios", precio: 12.50, imagen: "imagenes/juegete.png" }
];

const renderizar = (lista) => {
    const contenedor = document.getElementById('grid-productos');
    const template = document.getElementById('item-producto').content;
    if (!contenedor) return;
    contenedor.innerHTML = ''; 

    lista.forEach(item => {
        const clon = template.cloneNode(true);
        clon.querySelector('.producto-nombre').textContent = item.nombre;
        clon.querySelector('.producto-etiqueta').textContent = item.categoria;
        clon.querySelector('.producto-precio').textContent = `S/ ${item.precio.toFixed(2)}`;
        clon.querySelector('.producto-img').src = item.imagen;
        clon.querySelector('.btn-comprar').onclick = () => verDetalle(item);
        contenedor.appendChild(clon);
    });
};

const verDetalle = (prod) => {
    document.getElementById('modal-nombre').textContent = prod.nombre;
    document.getElementById('modal-img').src = prod.imagen;
    document.getElementById('modal-precio').textContent = `Precio: S/ ${prod.precio.toFixed(2)}`;
    document.getElementById('modal-categoria').textContent = prod.categoria;
    
    const mensaje = `Hola, deseo información de: ${prod.nombre}`;
    document.getElementById('btn-whatsapp').href = `https://wa.me{encodeURIComponent(mensaje)}`;
    
    document.getElementById('modal-detalle').style.display = "block";
};

document.querySelector('.cerrar-modal').onclick = () => {
    document.getElementById('modal-detalle').style.display = "none";
};

document.getElementById('mobile-menu').addEventListener('click', () => {
    document.getElementById('nav-list').classList.toggle('active');
});

window.filtrar = (cat) => {
    const filtrados = (cat === 'Todos') ? catalogo : catalogo.filter(p => p.categoria === cat);
    renderizar(filtrados);
    document.getElementById('nav-list').classList.remove('active');
};

document.addEventListener('DOMContentLoaded', () => renderizar(catalogo));
