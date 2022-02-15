var tarjetero;
var tarjetas = [];
var contadorTarjetas = 0;
//https://api.github.com/repos/Luizon/LevelMaker/commits
class Tarjeta {
	constructor(json) {
		this.titulo = json.titulo || "Título vacío";
		this.imagen = json.imagen || "";
		this.url = json.url || "https://luizon.github.io/" + json.nombre;
		this.fechaActualizacion = 'Cargando';
		this.fecha(json.nombre);
		this.descripcion = json.descripcion || "Sin descripción.";
		this.c = 0;
		this.id = `tarjetaNo${++contadorTarjetas}`;
		
		this.generarHTML();
		this.actualizaHTML();
	}

	sleep(ms) {
	    return new Promise(resolve => setTimeout(resolve, ms));
	}

	async fecha(nombre) {
		this.fechaActualizacion = 'Cargando';
		let that = this;
		await $.ajax({
			url: `https://api.github.com/repos/Luizon/${nombre}/commits`,
			success: (res) => {
				let fecha = res[0].commit.committer.date;
				that.fechaActualizacion = fecha.substring(0, 10);
			},
			error: () => {
				that.fechaActualizacion = 'Desconocido';
			}
		});
		return 'Cargando';
	}

	async actualizaHTML() {
		if(this.fechaActualizacion == 'Cargando') {
			this.c++;
			console.log(this.c + this.fechaActualizacion);
			await this.sleep(1000);
			this.actualizaHTML();
		}
		this.generarHTML();
		let estaTarjeta = document.getElementById(this.id);
		estaTarjeta.innerHTML = this.innerHTML;
	}
	
	generarHTML() {
		this.innerHTML = this.div("card",
			this.div("card-title",
				this.titulo
			)
			+ this.div("",
				"Ultima actualización: " + this.fechaActualizacion
			)
			+ this.div("card-subtitle",
				"Descripcion"
			)
			+ this.div("card-text",
				this.p(this.descripcion)
			)			
		);
	}
	
	div(clase, string) {
		let div = "<div class=\"" + clase + '"';
		if(clase == 'card')
			div+= ` id="${this.id}"`
		return div + "\">" + string + "</div>";
	}
	
	a(url, string) {
		return "<a href=\"" + url + "\">" + string + "</a>";
	}
	
	img(src, alt = "Sin imagen") {
		return "<img src=\"" + src + "\" alt=\"" + alt + "\"/>";
	}
	
	p(string) {
		return "<p>" + string + "</p>";
	}
}

function crearTarjetas() {
	tarjetas.push(new Tarjeta({
		titulo: "Pong",
		imagen: "assets/img/Pong.png",
		nombre: 'Javascript_Pong',
		descripcion: "El clásico Pong de toda la vida. Juegas solo con dificultad que va de 1 a 10, en una dificultad especial imposible de ganar o con alguien, compartiendo el teclado."
	}));
	tarjetas.push(new Tarjeta({
		titulo: "Flappy Thing",
		imagen: "assets/img/FlappyThing.png",
		nombre: 'Javascript_FlappyThing',
		descripcion: "El clásico Flappy Bird, recreado con gráficos. Intenta conseguir una gran puntuación, ¡entre mayor sea más complicado se vuelve el juego!"
	}));
	tarjetas.push(new Tarjeta({
		titulo: "Una calculadora",
		imagen: "assets/img/Calculator.png",
		nombre: 'calculadora',
		descripcion: "Una calculadora común y corriente."
	}));
	tarjetas.push(new Tarjeta({
		titulo: "MK11 Random character",
		imagen: "assets/img/mk11_random.png",
		nombre: 'MortalKombat11_Random',
		descripcion: "Escoge un personaje completamente aleatorio del roster de Mortal Kombat 11."
	}));
	tarjetas.push(new Tarjeta({
		titulo: "SSBU Random Character",
		imagen: "assets/img/ssbu_random.png",
		nombre: 'SmashUltimateRandom',
		descripcion: "Escoge un personaje completamente aleatorio del roster de Super Smash Bros Ultimate."
	}));
	tarjetas.push(new Tarjeta({
		titulo: "Piano",
		imagen: "assets/img/js_piano.png",
		nombre: 'js_piano',
		descripcion: "Piano sencillo que toma el tamaño de la ventana. Funciona con mouse y teclado."
	}));
	tarjetas.push(new Tarjeta({
		titulo: "Level Maker",
		imagen: "assets/img/LevelMaker.png",
		nombre: 'LevelMaker',
		descripcion: "Editor de niveles para crear un mini juego de plataformas sencillo. ¡Crea y juega tus propios niveles!"
	}));

	
	tarjetas.forEach( (tarjeta, i) => {
		let nodoTarjeta = document.createElement("div");
		nodoTarjeta.className = "text-center col p-4";
		nodoTarjeta.innerHTML = tarjeta.innerHTML;
		
		tarjetero.appendChild(nodoTarjeta);
	});
}

window.onload = function() {
	tarjetero = document.getElementById("tarjetero");
	crearTarjetas();
}
