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
