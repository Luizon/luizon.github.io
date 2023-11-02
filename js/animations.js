/////////////////////////////////////
// scrolling
/////////////////////////////////////
const sections = document.querySelectorAll('section');
const __body__ = document.getElementById("top");
const scrollButtons = document.querySelectorAll(".btn-scroll");
let currentSectionIndex = 0;
let isScrolling = false;

for(scrollElement in scrollButtons) {
    console.log(scrollButtons[scrollElement])
    if(typeof scrollButtons[scrollElement] !== "object")
        break;
    if(scrollButtons[scrollElement].classList.contains("btn-scroll-1"))
        scrollButtons[scrollElement].addEventListener("click", evt => scrollToSection(evt, CONST_PROJECTS));
}
__body__.addEventListener("keyup", scrollToSection);

function scrollToSection(evt, selectedSection = false) {
    if((evt.key != " " && selectedSection === false) || isScrolling)
        return;
    if(!__body__.classList.contains("smooth-1s"))
        __body__.classList.add("smooth-1s");
    isScrolling = true;
    setTimeout( e => {
        isScrolling = false;
    }, 1000);
    let flagSectionAlreadySelected = false;
    if(selectedSection !== false) {
        if(selectedSection < sections.length && selectedSection > 0) {
            currentSectionIndex = selectedSection;
            flagSectionAlreadySelected = true;
        }
    }
    if(!flagSectionAlreadySelected)
        currentSectionIndex++;
    if(currentSectionIndex == sections.length)
        currentSectionIndex = 0;
    sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
    if(currentSectionIndex == CONST_GREETINGS) {
        __body__.style.background = "#210333";
    }
    else {
        __body__.style.background = "#420666";
    }
};

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

const tetrisImageContainer = document.querySelectorAll('.tetris-shape-container')
const textToReplace = document.getElementsByClassName('text-to-replace')[0];

for(let i = 0 ; i < tetrisImageContainer.length ; i++) {
    let tetrisPiece = tetrisImageContainer[i];
    let followImage = tetrisPiece.children[0];
    if(tetrisPiece.classList.contains("tetris-shape-container"))
        followImage = followImage.children[0];
    let isHovered = false;
    tetrisPiece.addEventListener('mouseenter', () => {
      isHovered = true;
    });
    
    tetrisPiece.addEventListener('mouseleave', () => {
      isHovered = false;
      followImage.style.transform = 'translate(0, 0)';
    });
    
    tetrisPiece.addEventListener('mousemove', (e) => {
      if (isHovered) {
        const x = e.clientX - tetrisPiece.getBoundingClientRect().left - tetrisPiece.offsetWidth / 2;
        const y = e.clientY - tetrisPiece.getBoundingClientRect().top - tetrisPiece.offsetHeight / 2;
    
        followImage.style.transform = `translate(${x/5}px, ${y/5}px) scale(1.3)`;

        if(textToReplace.innerText != tetrisPiece.ariaLabel)
            textToReplace.innerText = tetrisPiece.ariaLabel;
      }
    });
}


