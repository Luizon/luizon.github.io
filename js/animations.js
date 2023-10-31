/////////////////////////////////////
// scrolling
/////////////////////////////////////
const sections = document.querySelectorAll('section');
const __body__ = document.getElementById("top");
__body__.addEventListener("keyup", evt => {
    if(evt.key != " ")
        return;
    currentSectionIndex++;
    if(currentSectionIndex == sections.length)
        currentSectionIndex = 0;
    sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
})


let flagSectionChanged = false;
let currentSectionIndex = 0;
let lastScrollY = 0;

const moveToSection = (event) => {
    let isScrollingDownwards = window.scrollY - lastScrollY > 0;
    lastScrollY = window.scrollY;
    // console.log(isScrollingDownwards, currentSectionIndex);
    if(isScrollingDownwards && currentSectionIndex < sections.length - 1)
    ++currentSectionIndex;
else if(!isScrollingDownwards && currentSectionIndex > 0)
--currentSectionIndex;
sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
}

window.addEventListener('scrollend', moveToSection);

/////////////////////////////////////
// Qualities texts
/////////////////////////////////////
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

/////////////////////////////////////
// tetris image follows the mouse
/////////////////////////////////////

const tetrisImageContainer = document.getElementsByClassName('tetris-shape');
const textToReplace = document.getElementsByClassName('text-to-replace')[0];

for(let i = 0 ; i < tetrisImageContainer.length ; i++) {
    let tetrisPiece = tetrisImageContainer[i];
    let followImage = tetrisPiece.children[0];
    let isHovered = false;
    tetrisPiece.addEventListener('mouseenter', () => {
      isHovered = true;
    });
    
    tetrisPiece.addEventListener('mouseleave', () => {
      isHovered = false;
      // Restablece la posición de la imagen cuando el ratón sale
      followImage.style.transform = 'translate(0, 0)';
    });
    
    tetrisPiece.addEventListener('mousemove', (e) => {
      if (isHovered) {
        // Calcula la posición relativa de la imagen con respecto al puntero del ratón
        const x = e.clientX - tetrisPiece.getBoundingClientRect().left - tetrisPiece.offsetWidth / 2;
        const y = e.clientY - tetrisPiece.getBoundingClientRect().top - tetrisPiece.offsetHeight / 2;
    
        // Aplica la transformación para mover la imagen ligeramente
        followImage.style.transform = `translate(${x/5}px, ${y/5}px) scale(1.3)`;

        if(textToReplace.innerText != tetrisPiece.title)
            textToReplace.innerText = tetrisPiece.title;
      }
    });
}
