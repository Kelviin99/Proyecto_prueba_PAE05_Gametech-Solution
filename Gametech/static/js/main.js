// Sistema de gestión de productos para Gametech Solution
// Utiliza sessionStorage para compatibilidad con artifacts

// Función para actualizar el numerito del carrito
function actualizarNumerito() {
    const numerito = document.querySelector("#numerito");
    if (!numerito) return;
    
    let productosEnCarrito = sessionStorage.getItem("productos-en-carrito");
    productosEnCarrito = productosEnCarrito ? JSON.parse(productosEnCarrito) : [];
    
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

// Función para agregar productos al carrito
function agregarAlCarrito(e) {
    const boton = e.currentTarget;
    const id = boton.getAttribute('data-id');
    const titulo = boton.getAttribute('data-titulo');
    const precio = parseInt(boton.getAttribute('data-precio'));
    const imagen = boton.getAttribute('data-imagen');
    
    // Obtener productos del carrito
    let productosEnCarrito = sessionStorage.getItem("productos-en-carrito");
    productosEnCarrito = productosEnCarrito ? JSON.parse(productosEnCarrito) : [];
    
    // Verificar si el producto ya está en el carrito
    const index = productosEnCarrito.findIndex(producto => producto.id === id);
    
    if (index !== -1) {
        // Si existe, aumentar cantidad
        productosEnCarrito[index].cantidad++;
    } else {
        // Si no existe, agregarlo
        productosEnCarrito.push({
            id: id,
            titulo: titulo,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        });
    }
    
    // Guardar en sessionStorage
    sessionStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    // Actualizar numerito
    actualizarNumerito();
    
    // Mostrar mensaje de confirmación
    alert(`✅ ${titulo} agregado al carrito`);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar numerito al cargar la página
    actualizarNumerito();
    
    // Agregar event listeners a todos los botones de agregar
    const botonesAgregar = document.querySelectorAll('.producto-agregar');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });
});