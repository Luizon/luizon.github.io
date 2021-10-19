var tarjetero;
var tarjetas = [];

class Tarjeta {
	constructor(json) {
		this.titulo = json.titulo || "Título vacío";
		this.imagen = json.imagen || "";
		this.url = json.url || "https://luizon.github.io/notFound";
		this.fechaActualizacion = json.fechaActualizacion || "Desconocido.";
		this.descripcion = json.descripcion || "Sin descripción.";
		
		this.innerHTML = this.generarHTML();
	}
	
	generarHTML() {
		return this.div("card",
			this.a(this.url,
				this.div("card-img-top",
					this.img(this.imagen)
				)
			)
			+ this.div("card-title",
				this.titulo
			)
			+ this.div("card-subtitle",
				"Descripcion"
			)
			+ this.div("",
				"Ultima actualización: " + this.fechaActualizacion
			)
			+ this.div("card-text",
				this.p(this.descripcion)
			)
		);
	}
	
	div(clase, string) {
		return "<div class=\"" + clase + "\">" + string + "</div>";
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
		url: "https://luizon.github.io/Javascript_Pong/",
		fechaActualizacion: "dd/mm/aaaa",
		descripcion: "El clásico Pong de toda la vida. Juegas solo con dificultad que va de 1 a 10, en una dificultad especial imposible de ganar o con alguien, compartiendo el teclado."
	}));
	tarjetas.push(new Tarjeta({
		titulo: "Flappy Thing",
		imagen: "assets/img/FlappyThing.png",
		url: "https://luizon.github.io/Javascript_FlappyThing/",
		fechaActualizacion: "dd/mm/aaaa",
		descripcion: "El clásico Flappy Bird, recreado con gráficos. Intenta conseguir una gran puntuación, ¡entre mayor sea más complicado se vuelve el juego!"
	}));
	tarjetas.push(new Tarjeta({
		titulo: "Una calculadora",
		imagen: "assets/img/Calculator.png",
		url: "https://luizon.github.io/calculadora/",
		fechaActualizacion: "dd/mm/aaaa",
		descripcion: "Una calculadora común y corriente."
	}));
	tarjetas.push(new Tarjeta({
		titulo: "MK11 Random character",
		imagen: "assets/img/mk11_random.png",
		url: "https://luizon.github.io/MortalKombat11_Random/",
		fechaActualizacion: "dd/mm/aaaa",
		descripcion: "Escoge un personaje completamente aleatorio del roster de Mortal Kombat 11."
	}));
	tarjetas.push(new Tarjeta({
		titulo: "Smash Ultimate Random Character",
		imagen: "assets/img/ssbu_random.png",
		url: "https://luizon.github.io/SmashUltimateRandom/",
		fechaActualizacion: "dd/mm/aaaa",
		descripcion: "Escoge un personaje completamente aleatorio del roster de Super Smash Bros Ultimate."
	}));
	tarjetas.push(new Tarjeta({
		titulo: "Piano",
		imagen: "assets/img/js_piano.png",
		url: "https://luizon.github.io/js_piano/",
		fechaActualizacion: "dd/mm/aaaa",
		descripcion: "Piano sencillo que toma el tamaño de la ventana. Funciona con mouse y teclado."
	}));
	tarjetas.push(new Tarjeta({
		titulo: "Level Maker",
		imagen: "assets/img/LevelMaker.png",
		url: "https://luizon.github.io/LevelMaker/",
		fechaActualizacion: "dd/mm/aaaa",
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