/////////////////////////////////////
// Qualities texts
/////////////////////////////////////
const elts = {
  text1: $("#text1")[0],
  text2: $("#text2")[0]
};

const morphTime = 1.5;
const cooldownTime = 2;

let textIndex = qualities.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = qualities[textIndex % qualities.length];
elts.text2.textContent = qualities[(textIndex + 1) % qualities.length];

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
  if(elts.text2.style.opacity == 1 // this optimze a lil bit this dom change
      && elts.text2.textContent.substring(0, 2) != qualities[(textIndex + 1) % qualities.length].substring(0, 2)) { // this help to maintain soft the animation even if you switch the language
    elts.text1.textContent = elts.text2.textContent;
    elts.text2.textContent = qualities[(textIndex + 1) % qualities.length];
  }

  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
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

      if($("#projects_title").text() != tetrisPiece.ariaLabel)
        $("#projects_title").text(tetrisPiece.ariaLabel);
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

async function changeSingleImage(projectName, imgNode) {
  imgNode = $(`#${projectName}`)[0];

  if(imgNode.classList.contains("fade-in"))
    imgNode.classList.remove("fade-in");

  let newImage = new Image(); // image buffer
  let index = parseInt(imgNode.src.match(/\d+(?=\.png)/)[0]); // get current index
  index = ((index + 1) % (project[projectName] + 1) ); // get next index
  index = index <= 0 ? 1 : index;
  newImage.src = `../img/projects/${projectName}/${index}.png`; // actual file's name

  await new Promise( resolve => {
    newImage.onload = () => {
      imgNode.classList.add("fade-out"); // fade out last like 250ms
      setTimeout(async () => {
        $(imgNode).attr('src', newImage.src);

        if(imgNode.classList.contains("fade-out"))
        imgNode.classList.remove("fade-out");
        imgNode.classList.add("fade-in");

        resolve(true);
      }, 300)
    }
    newImage.onerror = err => {
      console.error("An error happened while loading a project image.")
      console.error(err);
      resolve(false);
    }
  });
}

function changeAllImages() {
  if(!fading) {
    fading = true;
    setTimeout( async evt => { await changeSingleImage("cracksCode");
      setTimeout( async evt => { await changeSingleImage("crm");
        setTimeout( async evt => { await changeSingleImage("drp");
          setTimeout( async evt => { await changeSingleImage("ESpeedruN");
            setTimeout( async evt => { await changeSingleImage("monitorKart");
              setTimeout( async evt => { await changeSingleImage("monitorIsa");
                setTimeout( async evt => { await changeSingleImage("LevelMaker");
                  fading = false;
                }, 250);
              }, 250);
            }, 250);
          }, 250);
        }, 250);
      }, 250);
    }, 250);
  }
}

setInterval( () => {
  changeAllImages();
}, 10000);