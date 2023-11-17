/////////////////////////////////////
// Qualities texts
/////////////////////////////////////
const elts = {
  text1: $("#text1")[0],
  text2: $("#text2")[0]
};

// let textsEN = [
//   "👨🏾‍💻 Developer",
//   "💡 Creative mind",
//   "🎯 Problem solver",
//   "☕ Coffeeholic",
//   "👾 Gamer",
// ];

const morphTime = 1.5;
const cooldownTime = 2;

let textIndex = qualities.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

// if(window.location.href.includes("/EN")) {
//   elts.text1.textContent = textsEN[textIndex % textsEN.length];
//   elts.text2.textContent = textsEN[(textIndex + 1) % textsEN.length];
// }
// else {
  elts.text1.textContent = qualities[textIndex % qualities.length];
  elts.text2.textContent = qualities[(textIndex + 1) % qualities.length];
// }

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

  // if(window.location.href.includes("/EN")) {
  //   elts.text1.textContent = textsEN[textIndex % textsEN.length];
  //   elts.text2.textContent = textsEN[(textIndex + 1) % textsEN.length];
  // }
  // else {
    elts.text1.textContent = qualities[textIndex % qualities.length];
    elts.text2.textContent = qualities[(textIndex + 1) % qualities.length];
  // }
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

const tetrisImageContainer = $('.tetris-shape-container')
const textToReplace = $('.text-to-replace')[0];

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

/////////////////////////////////////
// tetris image change over time
/////////////////////////////////////

const project = {
  // projectName : quantityOfImages
  cracksCode : 2,
  crm : 5,
  drp : 8,
  ESpeedruN : 2,
  LevelMaker : 1,
  monitorIsa : 11,
  monitorKart : 3,
};
let fading = false;

function changeSingleImage(projectName, imgNode) {
  imgNode = $(`#${projectName}`)[0];

  if(imgNode.classList.contains("fade-in"))
    imgNode.classList.remove("fade-in");
  imgNode.classList.add("fade-out"); // fade out last like 250ms

  setTimeout(() => {
    let index = parseInt(imgNode.src.match(/\d+(?=\.png)/)[0]); // get current index
    index = ((index + 1) % (project[projectName] + 1) ); // get next index
    index = index <= 0 ? 1 : index;
    imgNode.src = `../img/projects/${projectName}/${index}.png`; // actual file's name
    
    if(imgNode.classList.contains("fade-out"))
      imgNode.classList.remove("fade-out");
    imgNode.classList.add("fade-in");
  }, 300);
}

function changeAllImages() {
  if(!fading) {
    fading = true;
    setTimeout( evt => { changeSingleImage("cracksCode")
      setTimeout( evt => { changeSingleImage("crm")
        setTimeout( evt => { changeSingleImage("drp")
          setTimeout( evt => { changeSingleImage("ESpeedruN")
            setTimeout( evt => { changeSingleImage("monitorKart")
              setTimeout( evt => { changeSingleImage("monitorIsa")
                setTimeout( evt => {
                    changeSingleImage("LevelMaker");
                    fading = false;
                }, 500);
              }, 500);
            }, 500);
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  }
}

setInterval( () => {
  changeAllImages();
}, 10000);