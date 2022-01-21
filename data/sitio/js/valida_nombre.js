function pideNombre() {
    var invalido = true;
    var mensaje = document.getElementById("mensaje");
    mensaje.innerHTML = "<h3>Registrando.</h3>";
    while (invalido) {
        var nombre = prompt("Por favor escriba su nombre");
        if (isNaN(nombre)) {
            var armado = "<h3>Hola " + nombre + ". ¿Desea reservar?<h3>";
            invalido = false;
        } else {
             mensaje.innerHTML = "<p>Nombre inválido</p>";
        }
    }
        mensaje.innerHTML = armado;
}