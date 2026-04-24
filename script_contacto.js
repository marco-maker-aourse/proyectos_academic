function enviarFormulario() {
    // Obtenemos los valores de todos los campos, incluyendo la especie
    let nombre = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;
    let correo = document.getElementById("correo").value;
    let especie = document.getElementById("especie").value;
    let servicio = document.getElementById("servicio").value;

    // Validación: Comprobamos que ningún campo esté vacío
    if(nombre === "" || telefono === "" || correo === "" || especie === "" || servicio === "") {
        alert("Por favor, completa todos los campos con asterisco (*)");
        return;
    }

    // Mensaje de éxito personalizado con la especie del animal
    alert("¡Gracias, " + nombre + "! Nos pondremos en contacto pronto para atender a tu " + especie + ".");
}