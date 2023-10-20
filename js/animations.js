// Obtén todas las secciones
const sections = document.querySelectorAll('section');
let currentSectionIndex = 0;
// let lastUbi = 0;

// Agrega un evento para detectar el desplazamiento
const moveToSection = (event) => {
    console.log(event)
    if (event.deltaY > 0) {
        // Desplazamiento hacia abajo
        if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            console.log("bajar a " + currentSectionIndex)
            sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
        }
    } else if (event.deltaY < 0) {
        // Desplazamiento hacia arriba
        if (currentSectionIndex > 0) {
            currentSectionIndex--;
            console.log("subir a " + currentSectionIndex)
            sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
        }
    }
}
// window.addEventListener('scrollend', moveToSection);
window.addEventListener('wheel', moveToSection);

const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    "👨🏾‍💻 Desarollador",
    "💡 Mente creativa",
    "🎯 Solucionador de problemas",
    "☕ Cafeinómano",
    "👾 Videojugador",
];
const textsEN = [
    "👨🏾‍💻 Developer",
    "💡 Creative mind",
    "🎯 Problem solver",
    "☕ Coffeeholic",
    "👾 Gamer",
];

const morphTime = 1.5;
const cooldownTime = 2;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

if(window.location.href.includes("/EN")) {
    elts.text1.textContent = textsEN[textIndex % textsEN.length];
    elts.text2.textContent = textsEN[(textIndex + 1) % textsEN.length];
}
else {
    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    if(window.location.href.includes("/EN")) {
        elts.text1.textContent = textsEN[textIndex % textsEN.length];
        elts.text2.textContent = textsEN[(textIndex + 1) % textsEN.length];
    }
    else {
        elts.text1.textContent = texts[textIndex % texts.length];
        elts.text2.textContent = texts[(textIndex + 1) % texts.length];
    }
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();