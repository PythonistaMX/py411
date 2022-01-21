var menu = [["Consomé", "Arroz", "Pollo asado", "Postre"],
        ["Ensalada", "Fideos", "Pollo asado", "Postre"],
        ["Consomé", "Arroz", "Chilaquiles", "Postre"],
        ["Sopa del día", "Arroz", "Hígado encebollado", "Postre"],
        ["Sopa de mariscos", "Ensalada", "Pescado a la talla", "Postre"]];

function eligePaquetes() {
    var invalido = true;
    var mensaje = document.getElementById("mensaje");
    mensaje.innerHTML = "<h3>Registrando.</h3>";
    while (invalido) {
        var numero = prompt("¿Qué número de paquete desea?");
        if (!(isNaN(numero)) && (numero >= 1) && (numero <= 5)) {
            var paquete = menu[numero - 1];
            var lista = "<ul>";
            for (plato = 0; plato < 4; plato = plato + 1) {
                lista = lista + "<li>" + paquete[plato] + "</li>";
            }
            lista = lista + "</ul>";
            var armado = "<h3>Escogiste el paquete " + numero + "<h3>" + lista;
            invalido = false;
        } else {
            mensaje.innerHTML = "<p>Número inválido</p>";
        }
    }
    mensaje.innerHTML = armado;
}