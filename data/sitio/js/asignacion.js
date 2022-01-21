/* Identificación de elementos HTML */

let mesasTotal = document.getElementById("mesasTotal");
let mesasDesocupadas = document.getElementById("mesasDesocupadas");
let mesasConEspacio = document.getElementById("mesasConEspacio");
let mesasLlenas = document.getElementById("mesasLlenas");
let asientosTotal = document.getElementById("asientosTotal");
let asientosOcupados = document.getElementById("asientosOcupados");
let asientosDesocupados = document.getElementById("asientosDesocupados");
let Indicador = document.getElementById("indicador");


/* Creación del objeto Mesa */

let Mesa = function () {
    "use strict";
    
    /* Definición de propiedades del objeto. */
    
    this.Capacidad = 6;
    this.asientosDesocupados = this.Capacidad;
    
    /* Definición del método ocupa(), el cual modifica la propiedad .asientosDesocupados */
    
    this.ocupa = function (comensales) {
        let diferencia = this.asientosDesocupados - comensales;
        if (diferencia >= 0) {
            this.asientosDesocupados = diferencia;
        } else {
            let sobrantes = comensales - this.asientosDesocupados;
            window.alert("Mesa está llena. No fue posible acomodar a " + sobrantes + " personas.");
            this.asientosDesocupados = 0;
        }
    };
};

/*Arreglo que contiene instancias del objeto Mesa.*/

let restauranteArreglo = [new Mesa(), new Mesa(), new Mesa(), new Mesa(),
                   new Mesa(), new Mesa(), new Mesa(), new Mesa()
                  ];

/*restauranteObjeto es una instancia de Mesa, pero se le añaden propiedades y métodos adicionales.
 Este objeto almacenará los datos generales de ocupación de todas las mesas del restaurante.*/

let restauranteObjeto = new Mesa();

/* restaurante.Objeto.Actualiza es un método que actualiza las propiedades de restauranteObjeto.
 Este método es único de restauranteObjeto y se encarga de revisar la ocupación de cada una de las instancias
 de Mesa contenidas en restauranteArreglo para calcular los datos de ocupación general del restaurante.*/

restauranteObjeto.Actualiza = function () {
    "use strict";
    let mesaNumero;
    this.mesasTotal = restauranteArreglo.length;
    this.mesasDesocupadas = 0;
    this.asientosDesocupados = 0;
    this.Capacidad = 0;
    this.mesasLlenas = 0;
    this.mesasConEspacio = 0;
	this.elemento = document.createElement;
    for (let mesaNumero = 0; mesaNumero < this.mesasTotal; mesaNumero = mesaNumero  + 1) {
        this.asientosDesocupados = this.asientosDesocupados + restauranteArreglo[mesaNumero].asientosDesocupados;
        this.Capacidad = this.Capacidad + restauranteArreglo[mesaNumero].Capacidad;
        if (restauranteArreglo[mesaNumero].asientosDesocupados === 0) {
            this.mesasLlenas = this.mesasLlenas + 1;
        } else if (restauranteArreglo[mesaNumero].asientosDesocupados === restauranteArreglo[mesaNumero].Capacidad) {
            this.mesasDesocupadas = this.mesasDesocupadas + 1;
        }
    }
    if (this.mesasDesocupadas === this.mesasTotal) {
        this.mesasConEspacio = "--";
    } else {
        this.mesasConEspacio = this.mesasTotal - this.mesasDesocupadas - this.mesasLlenas;
    }
};

/* función encargada de modificar los elementos HTML que conforman la tabla de información global de las mesas a
 partir de las propiedades contenidas en restauranteObjeto. */

function despliegaDatos() {
    "use strict";
    let i = 0;
	mesasTotal.replaceChild(document.createTextNode(String(restauranteObjeto.mesasTotal)), mesasTotal.firstChild);
    mesasDesocupadas.replaceChild(document.createTextNode(String(restauranteObjeto.mesasDesocupadas)), mesasDesocupadas.childNodes[0]);
    mesasConEspacio.replaceChild(document.createTextNode(String(restauranteObjeto.mesasConEspacio)), mesasConEspacio.childNodes[0]);
    mesasLlenas.replaceChild(document.createTextNode(String(restauranteObjeto.mesasLlenas)), mesasLlenas.childNodes[0]);
    asientosTotal.replaceChild(document.createTextNode(String(restauranteObjeto.Capacidad)), asientosTotal.childNodes[0]);
    asientosOcupados.replaceChild(document.createTextNode(String(restauranteObjeto.Capacidad - restauranteObjeto.asientosDesocupados)), asientosOcupados.childNodes[0]);
    asientosDesocupados.replaceChild(document.createTextNode(String(restauranteObjeto.asientosDesocupados)), asientosDesocupados.childNodes[0]);
    for (i = 0;  i < restauranteObjeto.mesasTotal;  i = i + 1) {
		restauranteArreglo[i].elemento.replaceChild(document.createTextNode(String(restauranteArreglo[i].asientosDesocupados)), restauranteArreglo[i].elemento.firstChild);
	    if (restauranteArreglo[i].Capacidad === restauranteArreglo[i].asientosDesocupados) {
		    restauranteArreglo[i].elemento.setAttribute("class", "desocupado");
	    } else if (restauranteArreglo[i].asientosDesocupados === 0) {
		    restauranteArreglo[i].elemento.setAttribute("class", "lleno");
	    } else {
		    restauranteArreglo[i].elemento.setAttribute("class", "disponible");
	    }
    }
}
 
/* Función que interactúa con el usuario para añadir asientos a una instancia de Mesa contenida en restauranteArreglo */

function alta(e) {
    "use strict";
    let numero,
		mesa = e.target.getAttribute("mesa"),
		invalido = true;
	
    while (invalido) {
        numero = window.prompt("Número de asientos en la mesa " + mesa + ".");
        if ((Number(numero) === 0) || (((Math.floor(numero) / numero) === 1) && (numero >= (restauranteArreglo[mesa - 1].asientosDesocupados - restauranteArreglo[mesa - 1].Capacidad)) && (!(isNaN(numero))))) {
            invalido = false;
			restauranteArreglo[mesa - 1].ocupa(numero);
			restauranteObjeto.Actualiza();
            despliegaDatos();
        }
    }
}

/*función que arma una tabla indicando los asientos disponibles de cada instancia de Mesa contenidas en
 resturante.Arreglo */

function creaTablaMesas() {
    "use strict";
    let i, cabecera = "<tr>",
		dato = "<tr>";
    for (i = 0; i < restauranteObjeto.mesasTotal; i = i + 1) {
        cabecera = cabecera + "<td>Mesa " + String(i + 1) + "</td>";
        dato = dato + '<td mesa="' + (i + 1) + '" ';
        if (restauranteArreglo[i].asientosDesocupados === 0) {
            dato = dato + ' class="lleno"></td>';
        } else if (restauranteArreglo[i].asientosDesocupados === restauranteArreglo[i].Capacidad) {
            dato = dato + ' class="desocupado">' + String(restauranteArreglo[i].asientosDesocupados) + "</td>";
        } else {
            dato = dato + ' class="disponible">' + String(restauranteArreglo[i].asientosDesocupados) + "</td>";
		}
    }
    dato = dato + "</tr>";
    cabecera = cabecera + "</tr>" + dato;
    Indicador.innerHTML = cabecera;
	let columna = Indicador.getElementsByTagName("tr")[1].childNodes;
	for (i = 0; i < columna.length; i = i + 1) {
	    restauranteArreglo[i].elemento = columna[i];
		restauranteArreglo[i].elemento.addEventListener("click", alta);
	}
}

/* función encargada de insertar los elementos HTML que conforman la tabla de información global de las mesas a
 partir de las propiedades contenidas en restauranteObjeto. */

function creaTablaRestaurante() {
    "use strict";
    restauranteObjeto.Actualiza();
    mesasTotal.appendChild(document.createTextNode(String(restauranteObjeto.mesasTotal)));
    mesasDesocupadas.appendChild(document.createTextNode(String(restauranteObjeto.mesasDesocupadas)));
    mesasConEspacio.appendChild(document.createTextNode(String(restauranteObjeto.mesasConEspacio)));
    mesasLlenas.appendChild(document.createTextNode(String(restauranteObjeto.mesasLlenas)));
    asientosTotal.appendChild(document.createTextNode(String(restauranteObjeto.Capacidad)));
    asientosOcupados.appendChild(document.createTextNode(String(restauranteObjeto.Capacidad - restauranteObjeto.asientosDesocupados)));
    asientosDesocupados.appendChild(document.createTextNode(String(restauranteObjeto.asientosDesocupados)));
}

// Cada vez que se carga este archivo, se invoca a las funciones que crean las tablas en HTML.
creaTablaRestaurante();
creaTablaMesas();