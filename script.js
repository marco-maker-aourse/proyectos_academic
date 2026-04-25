(() => {
    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

    const catalogo = [
        {
            id: 1,
            nombre: "Alimento premium",
            categoria: "Nutricion",
            precio: 75.0,
            imagen: "img/alim.png",
            descripcion: "Formula pensada para aportar energia, equilibrio nutricional y vitalidad diaria."
        },
        {
            id: 2,
            nombre: "Arnes de paseo",
            categoria: "Accesorios",
            precio: 22.5,
            imagen: "img/arnes.jpg",
            descripcion: "Pieza practica para paseos mas comodos, seguros y con mejor control."
        },
        {
            id: 3,
            nombre: "Kit de higiene",
            categoria: "Farmacia",
            precio: 15.9,
            imagen: "img/higene.jpg",
            descripcion: "Apoyo para rutinas de limpieza y cuidado cotidiano de forma sencilla."
        },
        {
            id: 4,
            nombre: "Nutricion de mantenimiento",
            categoria: "Nutricion",
            precio: 55.0,
            imagen: "img/aliment1.jpg",
            descripcion: "Alternativa de alimentacion para sostener una rutina activa y balanceada."
        },
        {
            id: 5,
            nombre: "Nutricion completa",
            categoria: "Nutricion",
            precio: 45.0,
            imagen: "img/aliment2.jpg",
            descripcion: "Presentacion orientada a acompanar etapas de crecimiento y cuidado diario."
        },
        {
            id: 6,
            nombre: "Cuidado dermatologico",
            categoria: "Farmacia",
            precio: 12.0,
            imagen: "img/famac1.png",
            descripcion: "Producto de apoyo para reforzar confort y bienestar de piel y pelaje."
        },
        {
            id: 7,
            nombre: "Shampoo medicado",
            categoria: "Farmacia",
            precio: 15.0,
            imagen: "img/farmac2.jpg",
            descripcion: "Opcion especializada para higiene externa con enfoque en cuidado adicional."
        },
        {
            id: 8,
            nombre: "Juguete interactivo",
            categoria: "Accesorios",
            precio: 12.5,
            imagen: "img/juegete.png",
            descripcion: "Estimulo y entretenimiento para una rutina mas activa y equilibrada."
        }
    ];

    const whatsappBaseUrl = "https://wa.me/";

    function initMenu() {
        const button = $("#mobile-menu");
        const nav = $("#nav-list");

        if (!button || !nav) return;

        button.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("active");
            button.setAttribute("aria-expanded", String(isOpen));
        });

        $$('a[href^="#"]', nav).forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("active");
                button.setAttribute("aria-expanded", "false");
            });
        });
    }

    function initHeader() {
        const header = $(".site-header");
        if (!header) return;

        const syncHeader = () => {
            header.classList.toggle("scrolled", window.scrollY > 16);
        };

        syncHeader();
        window.addEventListener("scroll", syncHeader, { passive: true });
    }

    function initProducts() {
        const contenedor = $("#grid-productos");
        const template = $("#item-producto");
        const modal = $("#modal-detalle");
        const modalNombre = $("#modal-nombre");
        const modalCategoria = $("#modal-categoria");
        const modalPrecio = $("#modal-precio");
        const modalImagen = $("#modal-img");
        const modalDescripcion = $("#modal-descripcion");
        const modalWhatsapp = $("#btn-whatsapp");
        const closeButton = $(".cerrar-modal");
        const filters = $$(".filter-btn");

        if (!contenedor || !template) return;

        function renderizar(lista) {
            contenedor.innerHTML = "";

            lista.forEach(item => {
                const clone = template.content.cloneNode(true);
                const image = $(".producto-img", clone);

                image.src = item.imagen;
                image.alt = item.nombre;
                $(".producto-etiqueta", clone).textContent = item.categoria;
                $(".producto-nombre", clone).textContent = item.nombre;
                $(".producto-descripcion", clone).textContent = item.descripcion;
                $(".producto-precio", clone).textContent = `S/ ${item.precio.toFixed(2)}`;

                $(".btn-comprar", clone)?.addEventListener("click", () => abrirDetalle(item));

                contenedor.appendChild(clone);
            });
        }

        function abrirDetalle(item) {
            if (!modal) return;

            if (modalNombre) modalNombre.textContent = item.nombre;
            if (modalCategoria) modalCategoria.textContent = item.categoria;
            if (modalPrecio) modalPrecio.textContent = `S/ ${item.precio.toFixed(2)}`;
            if (modalImagen) {
                modalImagen.src = item.imagen;
                modalImagen.alt = item.nombre;
            }
            if (modalDescripcion) modalDescripcion.textContent = item.descripcion;
            if (modalWhatsapp) {
                const mensaje = encodeURIComponent(`Hola, deseo informacion del producto: ${item.nombre}`);
                modalWhatsapp.href = `${whatsappBaseUrl}?text=${mensaje}`;
            }

            modal.classList.add("active");
            modal.setAttribute("aria-hidden", "false");
        }

        function cerrarDetalle() {
            if (!modal) return;
            modal.classList.remove("active");
            modal.setAttribute("aria-hidden", "true");
        }

        function aplicarFiltro(categoria) {
            const lista = categoria === "Todos"
                ? catalogo
                : catalogo.filter(item => item.categoria === categoria);

            renderizar(lista);
            filters.forEach(button => {
                button.classList.toggle("active", button.dataset.filter === categoria);
            });
        }

        filters.forEach(button => {
            button.addEventListener("click", () => {
                aplicarFiltro(button.dataset.filter || "Todos");
            });
        });

        closeButton?.addEventListener("click", cerrarDetalle);
        modal?.addEventListener("click", event => {
            if (event.target === modal) cerrarDetalle();
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") cerrarDetalle();
        });

        aplicarFiltro("Todos");
    }

    function initCarousel() {
        const slides = $$(".slide");
        const nextButton = $(".next");
        const prevButton = $(".prev");
        const dotsContainer = $("#carousel-dots");

        if (!slides.length || !dotsContainer) return;

        let currentIndex = 0;
        let timer = null;

        const dots = slides.map((_, index) => {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "carousel-dot";
            dot.setAttribute("aria-label", `Ir a la imagen ${index + 1}`);
            dot.addEventListener("click", () => {
                showSlide(index);
                restart();
            });
            dotsContainer.appendChild(dot);
            return dot;
        });

        function showSlide(index) {
            currentIndex = index;

            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle("active", slideIndex === currentIndex);
            });

            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle("active", dotIndex === currentIndex);
            });
        }

        function nextSlide() {
            showSlide((currentIndex + 1) % slides.length);
        }

        function prevSlide() {
            showSlide((currentIndex - 1 + slides.length) % slides.length);
        }

        function start() {
            stop();
            timer = window.setInterval(nextSlide, 5000);
        }

        function stop() {
            if (timer) {
                window.clearInterval(timer);
                timer = null;
            }
        }

        function restart() {
            stop();
            start();
        }

        nextButton?.addEventListener("click", () => {
            nextSlide();
            restart();
        });

        prevButton?.addEventListener("click", () => {
            prevSlide();
            restart();
        });

        const carousel = $(".carousel");
        carousel?.addEventListener("mouseenter", stop);
        carousel?.addEventListener("mouseleave", start);

        showSlide(0);
        start();
    }

    function initContactForm() {
        const form = $("#contact-form");
        if (!form) return;

        form.addEventListener("submit", event => {
            event.preventDefault();

            const nombre = $("#nombre")?.value.trim() || "";
            const telefono = $("#telefono")?.value.trim() || "";
            const correo = $("#correo")?.value.trim() || "";
            const especie = $("#especie")?.value.trim() || "";
            const servicio = $("#servicio")?.value.trim() || "";

            if (!nombre || !telefono || !correo || !especie || !servicio) {
                window.alert("Completa todos los campos antes de continuar.");
                return;
            }

            const mensaje = encodeURIComponent(
                `Hola, deseo coordinar una atencion.\nNombre: ${nombre}\nTelefono: ${telefono}\nCorreo: ${correo}\nMascota: ${especie}\nServicio: ${servicio}`
            );

            window.open(`${whatsappBaseUrl}?text=${mensaje}`, "_blank", "noopener");
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        initMenu();
        initHeader();
        initCarousel();
        initProducts();
        initContactForm();
    });
})();
