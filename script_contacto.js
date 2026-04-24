



<script>
function enviarFormulario() {
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let mensaje = document.getElementById("mensaje").value;

    if(nombre === "" || correo === "" || mensaje === "") {
        alert("Completa todos los campos");
        return;
    }

    alert("Mensaje enviado correctamente ✅");
}
</script>
