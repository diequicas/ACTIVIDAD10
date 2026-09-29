const clubConfig = {
    nombre: "Valencia CF",
    fundacion: 1919,
    estadio: "Mestalla",
    colores: ["Blanco", "Negro"],
    presentarClub() {
        return `El ${this.nombre} fue fundado en ${this.fundacion} y su estadio es ${this.estadio}.`;
    }
};

class Jugador {
    #golesAnotados = 0;
    #lesionado = false;

    constructor(nombre, dorsal, posicion, valorMercado) {
        this.nombre = nombre;
        this.dorsal = dorsal;
        this.posicion = posicion;
        this.valorMercado = valorMercado;
    }

    marcarGol() {
        if (this.#lesionado) {
            return `${this.nombre} está lesionado y no puede marcar goles.`;
        }
        this.#golesAnotados++;
        return `¡GOOOOL de ${this.nombre}! Ya suma ${this.#golesAnotados} goles.`;
    }

    cambiarEstadoLesion() {
        this.#lesionado = !this.#lesionado;
        return `${this.nombre} ahora está ${this.#lesionado ? "lesionado" : "recuperado y disponible"}.`;
    }

    getGoles() {
        return this.#golesAnotados;
    }

    estaLesionado() {
        return this.#lesionado;
    }

    obtenerInfo() {
        return `${this.nombre} (#${this.dorsal}) - ${this.posicion} | Valor: ${this.valorMercado}M€ | Goles: ${this.#golesAnotados} | Lesionado: ${this.#lesionado ? "Sí" : "No"}`;
    }
}

class Plantilla {
    #jugadores = [];
    #presupuesto;

    constructor(entrenador, presupuestoInicial) {
        this.entrenador = entrenador;
        this.#presupuesto = presupuestoInicial;
    }

    ficharJugador(jugador) {
        if (this.#presupuesto >= jugador.valorMercado) {
            this.#presupuesto -= jugador.valorMercado;
            this.#jugadores.push(jugador);
            return `¡Fichaje exitoso! ${jugador.nombre} se une al equipo. Presupuesto restante: ${this.#presupuesto}M€`;
        } else {
            return `No hay suficiente presupuesto para fichar a ${jugador.nombre}. Coste: ${jugador.valorMercado}M€, Disponible: ${this.#presupuesto}M€`;
        }
    }

    listarPlantilla() {
        if (this.#jugadores.length === 0) {
            return "La plantilla está actualmente vacía.";
        }
        console.log(`--- Plantilla del ${clubConfig.nombre} (Entrenador: ${this.entrenador}) ---`);
        this.#jugadores.forEach(j => console.log(`- ${j.obtenerInfo()}`));
    }

    obtenerPresupuesto() {
        return this.#presupuesto;
    }
}

console.log(clubConfig.presentarClub());


const miPlantilla = new Plantilla("Diego Simeone", 100);

const j1 = new Jugador("Antoine Griezmann", 7, "Delantero", 25);
const j2 = new Jugador("Koke Resurrección", 6, "Centropcampista", 15);
const j3 = new Jugador("Jan Oblak", 13, "Portero", 30);

console.log(miPlantilla.ficharJugador(j1));
console.log(miPlantilla.ficharJugador(j2));
console.log(miPlantilla.ficharJugador(j3));


console.log(j1.marcarGol());
console.log(j1.marcarGol());
console.log(j2.marcarGol());

console.log(j1.cambiarEstadoLesion());
console.log(j1.marcarGol()); 

console.log("---------------------------------------------------");

miPlantilla.listarPlantilla();
