/////////////////////////////////////
// bootstrap tooltip
/////////////////////////////////////
const tooltipTriggerList = $('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

/////////////////////////////////////
// scrolling
/////////////////////////////////////
const section = {
  GREETINGS : 0,
  PROJECTS : 1,
  // CONST_TECHNOLOGIES : 2,
  CONTACT : 2
}
const sections = $('section');
const __body__ = $("#top")[0];
const scrollButtons = $(".btn-scroll");
const scrollToTopButton = $("#btnTop")[0];
const scrollToDownButton = $("#btnDown")[0];
let currentSectionIndex = 0;
let isScrolling = false;

for( scrollElement in scrollButtons ) {
  if(typeof scrollButtons[ scrollElement ] !== "object")
    break;
  if(scrollButtons[ scrollElement ].classList.contains("btn-scroll-1"))
    scrollButtons[ scrollElement ].addEventListener("click", evt => {
      scrollToSection( evt, section.PROJECTS );
    });
}
__body__.addEventListener("keyup", scrollToSection);
scrollToTopButton.addEventListener("click", evt => {
  scrollToSection( evt, section.GREETINGS );
});
scrollToDownButton.addEventListener("click", evt => {
  scrollToSection( evt, section.CONTACT );
});

function scrollToSection(evt, selectedSection = false) {
  if((evt.key != " " && selectedSection === false) || isScrolling)
    return;
  if(evt.key === " ") {
    if($("input, textarea, button.bilingual, a").is(":focus")) {
      // don't scroll, user is probably interacting with the form
      return;
    }
  }
  if(!__body__.classList.contains("smooth-1s"))
    __body__.classList.add("smooth-1s");
  isScrolling = true;
  setTimeout( e => {
    isScrolling = false;
  }, 1000);
  let flagSectionAlreadySelected = false;
  if(selectedSection !== false) {
    if(selectedSection < sections.length && selectedSection >= 0) {
      currentSectionIndex = selectedSection;
      flagSectionAlreadySelected = true;
    }
  }
  if(!flagSectionAlreadySelected)
    currentSectionIndex++;
  if(currentSectionIndex >= sections.length)
    currentSectionIndex = 0;
  sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
  if(currentSectionIndex == section.GREETINGS) {
    __body__.style.background = "#210333";
    window.location.href = window.location.origin + window.location.pathname + '#aboutMe';

    if(scrollToTopButton.classList.contains("fade-in"))
      scrollToTopButton.classList.remove("fade-in");
    scrollToTopButton.classList.add("fade-out");
    setTimeout( evt => { scrollToTopButton.hidden = true; }, 1000);

    if(scrollToDownButton.classList.contains("fade-in"))
      scrollToDownButton.classList.remove("fade-in");
    scrollToDownButton.classList.add("fade-out");
    setTimeout( evt => { scrollToDownButton.hidden = true; }, 1000);
    stopPong();
    // console.log("go to greetings");
  }
  else if(currentSectionIndex == section.PROJECTS) {
    goToProjects();
    // console.log("go to projects");
  }
  else {
    goToContact();
    // console.log("go to contact");
  }
};

function goToContact() {
  __body__.style.background = "#420666";
  window.location.href = window.location.origin + window.location.pathname + '#contact';

  if(scrollToDownButton.classList.contains("fade-in"))
    scrollToDownButton.classList.remove("fade-in");
  scrollToDownButton.classList.add("fade-out");
  setTimeout( evt => { scrollToDownButton.hidden = true; }, 1000);

  if(scrollToTopButton.hidden) {
    if(scrollToTopButton.classList.contains("fade-out"))
      scrollToTopButton.classList.remove("fade-out");
    if(scrollToTopButton.classList.contains("fade-in"))
      scrollToTopButton.classList.remove("fade-in");
    scrollToTopButton.classList.add("fade-in");
    scrollToTopButton.hidden = false;
  }
  startPong();
}

function goToProjects() {
  __body__.style.background = "#200077";
  window.location.href = window.location.origin + window.location.pathname + '#projects';
  if(!tetrisPiecesHasBeenMoved)
    moveTetrisPieces();

  if(scrollToTopButton.classList.contains("fade-out"))
    scrollToTopButton.classList.remove("fade-out");
  if(scrollToTopButton.classList.contains("fade-in"))
    scrollToTopButton.classList.remove("fade-in");
  scrollToTopButton.classList.add("fade-in");
  scrollToTopButton.hidden = false;

  if(scrollToDownButton.classList.contains("fade-out"))
    scrollToDownButton.classList.remove("fade-out");
  if(scrollToDownButton.classList.contains("fade-in"))
    scrollToDownButton.classList.remove("fade-in");
  scrollToDownButton.classList.add("fade-in");
  scrollToDownButton.hidden = false;
  stopPong();
}

/////////////////////////////////////
// window events
/////////////////////////////////////
window.onresize = evt => {
  sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
  resizePong();
}
window.onload = evt => {
  if(window.location.href.includes('#aboutMe'))
    scrollToSection(evt, section.GREETINGS);
  else if(window.location.href.includes('#projects'))
    scrollToSection(evt, section.PROJECTS);
  else if(window.location.href.includes('#contact'))
    scrollToSection(evt, section.CONTACT);
  else
    sections[section.GREETINGS].scrollIntoView({ behavior: 'smooth' });
}

/////////////////////////////////////
// mobile stuff
/////////////////////////////////////
if (!/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
  let onlyMobileElements = $(".mobile-only");
  for(element in onlyMobileElements) {
    if(typeof onlyMobileElements[element] !== "object")
      break;
    onlyMobileElements[element].hidden = true;
  }
}
else {
  scrollToTopButton.classList.add("btn-top-mobile");
  setTimeout( evt => {
    try {
      bootbox.dialog({
        title: dictionary[language].misc.warning,
        message: dictionary[language].misc.mobileDeviceMessage,
        onEscape: true
      })
    } catch(e) {
      alert(dictionary[language].misc.warning + ": " + dictionary[language].misc.mobileDeviceMessage);
      console.log(e)
    }
  }
  , 1000);
}

/////////////////////////////////////
// tetris project modals
/////////////////////////////////////
var btnModalChangeInterval;
var btnModalIndex;
function getModalContent(folderName) {
  let info = dictionary[language].sections.projects.systems[folderName];

  let cardContainer = $("<div></div>");
  let card = $("<div class='card mb-3' style='border: none;'></div>");
  let cardRow = $("<div class='row g-0'></div>");
  let cardRowCol1 = $("<div class='col-12 col-md-6'></div>");
  let cardRowCol2 = $("<div class='col-12 col-md-6'></div>");
  let cardBody = $("<div class='card-body ps-0 ps-md-3' style='padding: 0px;'></div>");
  let cardTitle = $(`<h4 class='card-title mt-4'>${info.title}</h4>`);
  let cardTechnologies = $(`<div class='modal-technologies justify-content-center hide-on-xs'></div>`);
  let cardText = $(`<p class='card-text ps-0 ps-md-3 pe-0 pe-md-4'>${info.description}</p>`);
  if(info.url !== undefined) {
    cardTitle.html("");
    let innerTitle = dictionary[language].misc.visit;
    if(info.url.includes("github"))
      innerTitle = dictionary[language].misc.watchRepo;
    let titleUrl = $(`<a target="_blank" href='${info.url}'>${info.title}</a>`);
    let titleImg = $(`<img class='ps-2 pe-2 ms-1 modal-title-redirect' src='../img/redirect.svg' data-bs-toggle='tooltip' title='${innerTitle}' alt=''>`);
    titleUrl.append(titleImg);
    cardTitle.append(titleUrl);
    new bootstrap.Tooltip(titleImg); // to activate bootstrap tooltip
  }
  cardTitle.append($("<hr class='hide-on-xs mt-1 mb-1 mt-md-3 mb-md-3'>"));
  cardTitle.append(cardTechnologies);
  cardTitle.append($("<hr class='hide-on-xs mt-1 mb-1 mt-md-3 mb-md-3'>"));

  cardContainer.append(card);
  card.append(cardRow);
  cardRow.append(cardRowCol1);
  cardRow.append(cardRowCol2);
  cardRowCol2.append(cardBody);
  cardBody.append(cardTitle);
  cardBody.append(cardText);

  for(technology in info.technologies) {
    let tech = info.technologies[technology];
    let newTechnology = $(`<img class='modal-technology' data-bs-toggle='tooltip' title='${technologyGlosary[tech]}' src='../img/technologies/${tech}.svg'>`);
    new bootstrap.Tooltip(newTechnology); // to activate bootstrap tooltip
    cardTechnologies.append(newTechnology);
  }

  let sliderContainer = $("<div class='slider-container img-fluid rounded-start'></div>");
  let buttonContainer = $("<div class='slider-dot-container translate-middle'></div>");
  let dot = "<div class='dot'></div>";
  for(let i = 1 ; i < projectImages[folderName] + 1 ; i++) {
    let newImg = $(`<img class="slider-item" src='../img/projects/${folderName}/${i}.png' alt="${info.title + ' ' + i}">`)
    // setImageListener(newImg);
    let newButton = $(`<button id="btnModal${i}" tabindex="-1" class="slider-dot" onclick="$('.slider-item[src=\\'../img/projects/${folderName}/${i}.png\\']')[0].scrollIntoView({ behavior: 'smooth' }); startSlider(${i});">${dot}</button>`);
    newButton.on('click', () => {
      if(!newButton.hasClass("active")) {
        $('.slider-dot').removeClass("active");
        newButton.addClass("active");
      }
    })
    sliderContainer.append(newImg);
    buttonContainer.append(newButton);
  }

  buttonContainer.children().get(0).classList.add("active");
  sliderContainer.append(buttonContainer);
  cardRowCol1.append(sliderContainer);

  btnModalIndex = 0;
  btnModalChangeInterval = setInterval(e => {
    if($(`#btnModal${btnModalIndex + 1}`)[0] !== undefined)
      btnModalIndex++;
    else
      btnModalIndex = 1;
    $(`#btnModal${btnModalIndex}`)[0].click();
  }, 5000);

  return cardContainer;
}

function killModalChangeIntervalProcess() {
  clearTimeout(btnModalChangeInterval);
}

function startSlider(index) {
  killModalChangeIntervalProcess();
  btnModalChangeInterval = setInterval(e => {
    if($(`#btnModal${btnModalIndex + 1}`)[0] !== undefined)
      btnModalIndex++;
    else
      btnModalIndex = 1;
    $(`#btnModal${btnModalIndex}`)[0].click();
  }, 5000);
  btnModalIndex = index;
}

// function setImageListener(imgNode) {
//   let imgScale = 2;

//   let modalImgIsHovered = false;
//   imgNode.on('mouseenter', () => {
//     modalImgIsHovered = true;
//   });

//   imgNode.on('mouseleave', () => {
//     modalImgIsHovered = false;
//     imgNode[0].style.transform = 'translate(0, 0)';
//   });
    
//   imgNode.on('mousemove', (e) => {
//     if (modalImgIsHovered) {
//       const x = e.clientX - imgNode[0].getBoundingClientRect().left - imgNode[0].offsetWidth;
//       const y = e.clientY - imgNode[0].getBoundingClientRect().top - imgNode[0].offsetHeight;

//       imgNode[0].style.transform = `translate(${x*imgScale}px, ${y*imgScale}px) scale(${imgScale})`;
//     }
//   });
// }

$("#btn_cracksCode").on("click", () => {
  bootbox.dialog({
    onEscape : true,
    backdrop: true,
    className: 'bootbox-no-title card-slider',
    size : 'large',
    message: getModalContent("cracksCode"),
    onHide: killModalChangeIntervalProcess,
  });
});
$("#btn_crm").on("click", () => {
  bootbox.dialog({
    className: 'bootbox-no-title card-slider',
    size : 'large',
    message: getModalContent("crm"),
    backdrop: true,
    onEscape : true,
    onHide: killModalChangeIntervalProcess,
  });
});
$("#btn_drp").on("click", () => {
  bootbox.dialog({
    className: 'bootbox-no-title card-slider',
    size : 'large',
    message: getModalContent("drp"),
    backdrop: true,
    onEscape : true,
    onHide: killModalChangeIntervalProcess,
  });
});
$("#btn_ESpeedruN").on("click", () => {
  bootbox.dialog({
    className: 'bootbox-no-title card-slider',
    size : 'large',
    message: getModalContent("ESpeedruN"),
    backdrop: true,
    onEscape : true,
    onHide: killModalChangeIntervalProcess,
  });
});
$("#btn_LevelMaker").on("click", () => {
  bootbox.dialog({
    className: 'bootbox-no-title card-slider',
    size : 'large',
    message: getModalContent("LevelMaker"),
    backdrop: true,
    onEscape : true,
    onHide: killModalChangeIntervalProcess,
  });
});
$("#btn_monitorIsa").on("click", () => {
  bootbox.dialog({
    className: 'bootbox-no-title card-slider',
    size : 'large',
    message: getModalContent("monitorIsa"),
    backdrop: true,
    onEscape : true,
    onHide: killModalChangeIntervalProcess,
  });
});
$("#btn_monitorKart").on("click", () => {
  bootbox.dialog({
    className: 'bootbox-no-title card-slider',
    size : 'large',
    message: getModalContent("monitorKart"),
    backdrop: true,
    onEscape : true,
    onHide: killModalChangeIntervalProcess,
  });
});
$("#btn_contact").on("click", evt => {
  scrollToSection(evt, section.CONTACT);
});


$("#dictionary").ready(function() {
  $('body').fadeIn(100);
});

/////////////////////////////////////
// contact pong (CPU vs CPU)
/////////////////////////////////////
const pong = {
  canvas: null,
  ctx: null,
  running: false,
  rafId: null,
  lastTime: 0,
  dpr: Math.max(1, window.devicePixelRatio || 1),
  width: 0,
  height: 0,
  ball: null,
  left: null,
  right: null
};

function initPong() {
  if(!pong.canvas) {
    pong.canvas = document.getElementById('pong_canvas');
    if(!pong.canvas) return false;
    pong.ctx = pong.canvas.getContext('2d');
  }
  const contactSection = document.getElementById('contact');
  if(!contactSection) return false;
  const rect = contactSection.getBoundingClientRect();
  pong.width = Math.max(300, Math.floor(rect.width));
  pong.height = Math.max(200, Math.floor(rect.height));
  pong.canvas.width = Math.floor(pong.width * pong.dpr);
  pong.canvas.height = Math.floor(pong.height * pong.dpr);
  pong.canvas.style.width = pong.width + 'px';
  pong.canvas.style.height = pong.height + 'px';
  pong.ctx.setTransform(pong.dpr, 0, 0, pong.dpr, 0, 0);

  const padW = 50;
  const padH = Math.floor(pong.height * 0.18);
  const margin = 18;
  const baseSpeed = Math.max(220, Math.min(380, Math.floor(pong.width * 0.35)));

  pong.left = { x: margin, y: (pong.height - padH)/2, w: padW, h: padH, vy: 0, speed: baseSpeed };
  pong.right = { x: pong.width - margin - padW, y: (pong.height - padH)/2, w: padW, h: padH, vy: 0, speed: baseSpeed };
  pong.ball = { x: pong.width/2, y: pong.height/2, r: 15, vx: 0, vy: 0, speed: baseSpeed };
  resetBall(Math.random() < 0.5 ? -1 : 1);
  pong.lastTime = performance.now();
  return true;
}

function resizePong() {
  if(!pong.canvas) return;
  const wasRunning = pong.running;
  if(wasRunning) stopPong();
  initPong();
  if(wasRunning) startPong();
}

function resetBall(direction) {
  pong.ball.x = pong.width/2;
  pong.ball.y = pong.height/2;
  const minDeg = 12; // avoid flat starts
  const angleDeg = (minDeg + Math.random() * (30 - minDeg)) * (Math.random() < 0.5 ? -1 : 1);
  const rad = angleDeg * Math.PI / 180;
  pong.ball.vx = Math.cos(rad) * pong.ball.speed * direction;
  pong.ball.vy = Math.sin(rad) * pong.ball.speed;
}

function aiMove(paddle, targetY, dt, react = 0.9) {
  const center = paddle.y + paddle.h/2;
  const diff = targetY - center;
  const maxMove = paddle.speed * dt * react;
  const move = Math.max(-maxMove, Math.min(maxMove, diff));
  paddle.y += move;
  if(paddle.y < 0) paddle.y = 0;
  if(paddle.y + paddle.h > pong.height) paddle.y = pong.height - paddle.h;
}

function updatePong(dt) {
  // Move paddles (CPU vs CPU)
  const trackingBias = 0.85;
  if(pong.ball.vx < 0) {
    aiMove(pong.left, pong.ball.y, dt, trackingBias);
    aiMove(pong.right, pong.height/2, dt, 0.5);
  } else {
    aiMove(pong.right, pong.ball.y, dt, trackingBias);
    aiMove(pong.left, pong.height/2, dt, 0.5);
  }

  // Move ball
  pong.ball.x += pong.ball.vx * dt;
  pong.ball.y += pong.ball.vy * dt;

  // Wall collision top/bottom
  if(pong.ball.y - pong.ball.r <= 0 && pong.ball.vy < 0) {
    pong.ball.y = pong.ball.r;
    pong.ball.vy *= -1;
  }
  if(pong.ball.y + pong.ball.r >= pong.height && pong.ball.vy > 0) {
    pong.ball.y = pong.height - pong.ball.r;
    pong.ball.vy *= -1;
  }

  // Paddle collisions
  // Left paddle
  if(pong.ball.x - pong.ball.r <= pong.left.x + pong.left.w) {
    if(pong.ball.y >= pong.left.y && pong.ball.y <= pong.left.y + pong.left.h && pong.ball.vx < 0) {
      pong.ball.x = pong.left.x + pong.left.w + pong.ball.r;
      let offset = (pong.ball.y - (pong.left.y + pong.left.h/2)) / (pong.left.h/2);
      offset = Math.max(-1, Math.min(1, offset));
      if(Math.abs(offset) < 0.12) offset = 0.12 * (Math.random() < 0.5 ? -1 : 1);
      const angle = offset * (Math.PI / 4); // up to 45°
      const s = pong.ball.speed;
      pong.ball.vx = Math.cos(angle) * s;
      pong.ball.vy = Math.sin(angle) * s;
    }
  }
  // Right paddle
  if(pong.ball.x + pong.ball.r >= pong.right.x) {
    if(pong.ball.y >= pong.right.y && pong.ball.y <= pong.right.y + pong.right.h && pong.ball.vx > 0) {
      pong.ball.x = pong.right.x - pong.ball.r;
      let offset = (pong.ball.y - (pong.right.y + pong.right.h/2)) / (pong.right.h/2);
      offset = Math.max(-1, Math.min(1, offset));
      if(Math.abs(offset) < 0.12) offset = 0.12 * (Math.random() < 0.5 ? -1 : 1);
      const angle = offset * (Math.PI / 4); // up to 45°
      const s = pong.ball.speed;
      pong.ball.vx = -Math.cos(angle) * s;
      pong.ball.vy = Math.sin(angle) * s;
    }
  }

  // Out of bounds left/right → reset
  if(pong.ball.x < -30) resetBall(1);
  if(pong.ball.x > pong.width + 30) resetBall(-1);
}

function drawPong() {
  const ctx = pong.ctx;
  if(!ctx) return;
  ctx.clearRect(0, 0, pong.width, pong.height);
  ctx.fillStyle = '#000';
  ctx.strokeStyle = '#000';

  // Center line (dashed)
  ctx.globalAlpha = 0.25;
  const dashH = 12, gap = 10, centerX = Math.floor(pong.width/2);
  for(let y = 0; y < pong.height; y += dashH + gap) {
    ctx.fillRect(centerX - 1, y, 10, dashH);
  }
  ctx.globalAlpha = .5;

  // Paddles
  ctx.fillRect(pong.left.x, pong.left.y, pong.left.w, pong.left.h);
  ctx.fillRect(pong.right.x, pong.right.y, pong.right.w, pong.right.h);

  // Ball
  ctx.beginPath();
  ctx.arc(pong.ball.x, pong.ball.y, pong.ball.r, 0, Math.PI * 2);
  ctx.fill();
}

function loopPong(now) {
  if(!pong.running) return;
  const dtMs = now ? (now - pong.lastTime) : 16;
  pong.lastTime = now || performance.now();
  const dt = Math.min(0.033, Math.max(0.008, dtMs / 1000));
  updatePong(dt);
  drawPong();
  pong.rafId = requestAnimationFrame(loopPong);
}

function startPong() {
  if(pong.running) return;
  if(!initPong()) return;
  pong.running = true;
  pong.lastTime = performance.now();
  pong.rafId = requestAnimationFrame(loopPong);
}

function stopPong() {
  if(!pong.running) return;
  pong.running = false;
  if(pong.rafId) cancelAnimationFrame(pong.rafId);
  pong.rafId = null;
  if(pong.ctx) pong.ctx.clearRect(0, 0, pong.canvas.width, pong.canvas.height);
}