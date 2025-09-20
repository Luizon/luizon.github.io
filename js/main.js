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
const btnGoToProjects = $('.btnGoToProjects');
let currentSectionIndex = 0;
let isScrolling = false;
const __hideTimers = new WeakMap();

// smooth scroll helper
function smoothScrollToSectionId(id) {
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

for( scrollElement in scrollButtons ) {
  if(typeof scrollButtons[ scrollElement ] !== "object")
    break;
  if(scrollButtons[ scrollElement ].classList.contains("btn-scroll-1"))
    scrollButtons[ scrollElement ].addEventListener("click", evt => {
      smoothScrollToSectionId('projects');
    });
}
scrollToTopButton.addEventListener("click", evt => {
  smoothScrollToSectionId('aboutMe');
});
scrollToDownButton.addEventListener("click", evt => {
  smoothScrollToSectionId('contact');
});

// observe sections to sync UI state
let activeSectionId = null;
let sectionObserver = null;
const sectionBackgrounds = { aboutMe: "#210333", projects: "#200077", contact: "#420666" };

function setButtonsVisibilityFor(sectionId) {
  const fadeShow = (el) => {
    if(!el) return;
    const t = __hideTimers.get(el);
    if(t) { clearTimeout(t); __hideTimers.delete(el); }
    if(el.classList.contains('fade-out')) el.classList.remove('fade-out');
    el.classList.add('fade-in');
    el.hidden = false;
  };
  const fadeHide = (el) => {
    if(!el) return;
    const t = __hideTimers.get(el);
    if(t) { clearTimeout(t); __hideTimers.delete(el); }
    if(el.classList.contains('fade-in')) el.classList.remove('fade-in');
    el.classList.add('fade-out');
    const timeoutId = setTimeout(() => { el.hidden = true; __hideTimers.delete(el); }, 250);
    __hideTimers.set(el, timeoutId);
  };

  if(sectionId === 'aboutMe') {
    fadeHide(scrollToTopButton);
    fadeHide(scrollToDownButton);
    // show helper button only in aboutMe
    for(let i = 0; i < btnGoToProjects.length; i++) fadeShow(btnGoToProjects[i]);
  } else if(sectionId === 'projects') {
    fadeShow(scrollToTopButton);
    fadeShow(scrollToDownButton);
    // hide helper button when projects is active
    for(let i = 0; i < btnGoToProjects.length; i++) fadeHide(btnGoToProjects[i]);
  } else if(sectionId === 'contact') {
    fadeShow(scrollToTopButton);
    fadeHide(scrollToDownButton);
    // also hide helper button in contact
    for(let i = 0; i < btnGoToProjects.length; i++) fadeHide(btnGoToProjects[i]);
  }
}

function setActiveSection(id) {
  if(activeSectionId === id) return;
  activeSectionId = id;
  if(!__body__.classList.contains('smooth-1s')) __body__.classList.add('smooth-1s');
  __body__.style.background = sectionBackgrounds[id] || "#210333";
  const newHash = '#' + id;
  if(window.location.hash !== newHash) {
    history.replaceState(null, '', window.location.pathname + newHash);
  }
  setButtonsVisibilityFor(id);
  if(id === 'projects') {
    if(!tetrisPiecesHasBeenMoved) moveTetrisPieces();
    stopPong();
  } else if(id === 'contact') {
    startPong();
  } else {
    stopPong();
  }
}

function setupSectionObserver() {
  const targets = ['aboutMe','projects','contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);
  if(targets.length === 0) return;
  if(sectionObserver) {
    targets.forEach(t => sectionObserver.unobserve(t));
  }
  sectionObserver = new IntersectionObserver((entries) => {
    let best = null;
    for(const entry of entries) {
      if(!entry.isIntersecting) continue;
      if(!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
    }
    if(best && best.target && best.target.id) {
      setActiveSection(best.target.id);
    }
  }, { threshold: [0.25, 0.55, 0.75, 0.9] });
  targets.forEach(t => sectionObserver.observe(t));
  // initialize
  let initial = 'aboutMe';
  for(const t of targets) {
    const rect = t.getBoundingClientRect();
    const height = Math.max(1, rect.height);
    const visible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
    const ratio = visible / height;
    if(ratio > 0.55) { initial = t.id; break; }
  }
  setActiveSection(initial);
}

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
  resizePong();
}
window.onload = evt => {
  setupSectionObserver();
  if(window.location.href.includes("sent=true")) {
    bootbox.alert(dictionary[language].sections.contact.messageSent);
  }
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
  let cardRowCol1 = $("<div class='col-12 col-md-6 position-relative'></div>");
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

  let sliderContainer = $("<div class='slider-container img-fluid rounded-start position-relative'></div>");
  let sliderTrack = $("<div class='slider-track'></div>");
  sliderContainer.append(sliderTrack);
  let buttonContainer = $("<div class='slider-dot-container translate-middle'></div>");
  let dot = "<div class='dot'></div>";
  for(let i = 1 ; i < projectImages[folderName] + 1 ; i++) {
    let newImg = $(`<img class="slider-item" draggable="false" src='../img/projects/${folderName}/${i}.png' alt="${info.title + ' ' + i}">`)
    // mouse-position zoom
    newImg.on('mousemove', (e) => {
      const img = newImg[0];
      const rect = img.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      img.style.transformOrigin = `${x}% ${y}%`;
      img.style.transform = 'scale(1.25)';
    });
    newImg.on('mouseleave', () => {
      const img = newImg[0];
      img.style.transform = 'scale(1)';
      img.style.transformOrigin = '50% 50%';
    });
    // open fullscreen on click (ignore if dragging)
    let clickStartX = 0, clickStartY = 0, moved = false;
    newImg.on('mousedown touchstart', (e) => {
      const pt = e.touches && e.touches[0] ? e.touches[0] : e;
      clickStartX = pt.clientX; clickStartY = pt.clientY; moved = false;
    });
    newImg.on('mousemove touchmove', (e) => {
      const pt = e.touches && e.touches[0] ? e.touches[0] : e;
      if(Math.abs(pt.clientX - clickStartX) > 6 || Math.abs(pt.clientY - clickStartY) > 6) moved = true;
    });
    newImg.on('click', () => {
      if(!moved) openFullscreenViewer(folderName, i);
    });
    let newButton = $(`<button id="btnModal${i}" tabindex="-1" class="slider-dot">${dot}</button>`);
    newButton.on('click', () => { showIndex(i, true); });
    sliderTrack.append(newImg);
    buttonContainer.append(newButton);
  }

  buttonContainer.children().get(0).classList.add("active");
  // prev / next navigation buttons
  let prevBtn = $("<button type='button' class='slider-nav-btn slider-prev' aria-label='Previous'>‹</button>");
  let nextBtn = $("<button type='button' class='slider-nav-btn slider-next' aria-label='Next'>›</button>");
  const totalImages = projectImages[folderName] || 1;
  const showIndex = (idx, animate) => {
    if(idx < 1) idx = totalImages;
    if(idx > totalImages) idx = 1;
    btnModalIndex = idx;
    const tx = -(idx - 1) * 100;
    if(animate) sliderTrack.removeClass('dragging');
    sliderTrack[0].style.transform = `translateX(${tx}%)`;
    $('.slider-dot').removeClass('active');
    $(`#btnModal${idx}`).addClass('active');
  };
  const goNext = () => showIndex(btnModalIndex + 1, true);
  const goPrev = () => showIndex(btnModalIndex - 1, true);
  prevBtn.on('click', () => { killModalChangeIntervalProcess(); goPrev(); startSlider(btnModalIndex); });
  nextBtn.on('click', () => { killModalChangeIntervalProcess(); goNext(); startSlider(btnModalIndex); });
  cardRowCol1.append(sliderContainer);
  // keep controls anchored and centered relative to the column, not the scroller
  cardRowCol1.append(buttonContainer);
  cardRowCol1.append(prevBtn);
  cardRowCol1.append(nextBtn);

  // drag-to-swipe navigation with animated snap
  let isDraggingSlider = false;
  let dragStartX = 0;
  let dragDeltaX = 0;
  const getClientX = (evt) => (evt.touches && evt.touches[0] ? evt.touches[0].clientX : evt.clientX);
  sliderContainer.on('mousedown touchstart', (evt) => {
    isDraggingSlider = true;
    dragStartX = getClientX(evt);
    dragDeltaX = 0;
    killModalChangeIntervalProcess();
    sliderTrack.addClass('dragging');
    evt.preventDefault();
  });
  sliderContainer.on('mousemove touchmove', (evt) => {
    if(!isDraggingSlider) return;
    const x = getClientX(evt);
    dragDeltaX = x - dragStartX;
    const w = sliderContainer[0].clientWidth || 1;
    const deltaPercent = (dragDeltaX / w) * 100;
    const basePercent = -((btnModalIndex - 1) * 100);
    sliderTrack[0].style.transform = `translateX(${basePercent + deltaPercent}%)`;
    evt.preventDefault();
  });
  const endDrag = () => {
    if(!isDraggingSlider) return;
    const w = sliderContainer[0].clientWidth || 1;
    const threshold = Math.max(40, w * 0.15);
    sliderTrack.removeClass('dragging');
    if(dragDeltaX > threshold) {
      goPrev();
    } else if(dragDeltaX < -threshold) {
      goNext();
    } else {
      // snap back
      showIndex(btnModalIndex, true);
    }
    isDraggingSlider = false;
    startSlider(btnModalIndex);
  };
  sliderContainer.on('mouseup touchend touchcancel mouseleave', endDrag);

  // initialize position
  showIndex(1, false);

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

// fullscreen viewer
let fsOverlayEl = null;
let fsImgEl = null;
let fsFolder = null;
let fsIndex = 1;
function ensureFsOverlay() {
  if(fsOverlayEl) return fsOverlayEl;
  fsOverlayEl = document.createElement('div');
  fsOverlayEl.className = 'fs-viewer-overlay';
  fsOverlayEl.innerHTML = "<div class='fs-viewer-inner'><div class='fs-track'></div><div class='fs-dots'></div><button class='fs-close-btn' aria-label='Close'>✕</button><button class='fs-nav-btn fs-prev' aria-label='Previous'>‹</button><button class='fs-nav-btn fs-next' aria-label='Next'>›</button></div>";
  document.body.appendChild(fsOverlayEl);
  fsImgEl = null;
  const closeBtn = fsOverlayEl.querySelector('.fs-close-btn');
  const btnPrev = fsOverlayEl.querySelector('.fs-prev');
  const btnNext = fsOverlayEl.querySelector('.fs-next');
  const dotsEl = fsOverlayEl.querySelector('.fs-dots');
  closeBtn.addEventListener('click', closeFullscreenViewer);
  btnPrev.addEventListener('click', () => { fsPrev(); });
  btnNext.addEventListener('click', () => { fsNext(); });
  fsOverlayEl.addEventListener('click', (e) => {
    // close on click outside track and controls
    const trackEl = fsOverlayEl.querySelector('.fs-track');
    const controls = [closeBtn, btnPrev, btnNext, dotsEl];
    if(e.target === fsOverlayEl) { closeFullscreenViewer(); return; }
    const insideTrack = trackEl && (e.target === trackEl || trackEl.contains(e.target));
    const insideControls = controls.some(c => c && (c === e.target || c.contains(e.target)));
    if(!insideTrack && !insideControls) closeFullscreenViewer();
  });
  window.addEventListener('keydown', (e) => {
    if(fsOverlayEl && fsOverlayEl.style.display === 'flex') {
      if(e.key === 'Escape') closeFullscreenViewer();
      if(e.key === 'ArrowLeft') fsPrev();
      if(e.key === 'ArrowRight') fsNext();
    }
  });
  return fsOverlayEl;
}
function openFullscreenViewer(folderName, index) {
  ensureFsOverlay();
  fsFolder = folderName;
  fsIndex = index;
  fsOverlayEl.style.display = 'flex';
  buildFsSlidesAndDots();
  fsShowIndex(index, false);
}
function closeFullscreenViewer() {
  if(!fsOverlayEl) return;
  fsOverlayEl.style.display = 'none';
}
function fsNext() {
  const total = projectImages[fsFolder] || 1;
  fsIndex = fsIndex + 1 > total ? 1 : fsIndex + 1;
  fsShowIndex(fsIndex, true);
}
function fsPrev() {
  const total = projectImages[fsFolder] || 1;
  fsIndex = fsIndex - 1 < 1 ? total : fsIndex - 1;
  fsShowIndex(fsIndex, true);
}
function buildFsSlidesAndDots() {
  const oldTrack = fsOverlayEl.querySelector('.fs-track');
  const dotsWrap = fsOverlayEl.querySelector('.fs-dots');
  if(!oldTrack || !dotsWrap) return;
  // replace track to avoid duplicate event listeners across openings
  const track = document.createElement('div');
  track.className = 'fs-track';
  oldTrack.parentNode.replaceChild(track, oldTrack);
  dotsWrap.innerHTML = '';
  const total = projectImages[fsFolder] || 1;
  for(let i = 1; i <= total; i++) {
    const slide = document.createElement('div');
    slide.className = 'fs-slide';
    const img = document.createElement('img');
    img.src = `../img/projects/${fsFolder}/${i}.png`;
    img.alt = `${fsFolder} ${i}`;
    img.className = 'fs-viewer-img';
    slide.appendChild(img);
    track.appendChild(slide);
    const dot = document.createElement('button');
    dot.className = 'fs-dot';
    dot.setAttribute('aria-label', `Go to image ${i}`);
    dot.addEventListener('click', () => { fsIndex = i; fsShowIndex(i, true); });
    dotsWrap.appendChild(dot);
  }
  updateFsDotsActive();
  // setup drag on track
  fsSetupDrag(track);
}
function updateFsDotsActive() {
  const dotsWrap = fsOverlayEl ? fsOverlayEl.querySelector('.fs-dots') : null;
  if(!dotsWrap) return;
  const dots = dotsWrap.querySelectorAll('.fs-dot');
  dots.forEach((d, idx) => {
    if(idx + 1 === fsIndex) d.classList.add('active'); else d.classList.remove('active');
  });
}
function fsShowIndex(idx, animate) {
  const track = fsOverlayEl.querySelector('.fs-track');
  const total = projectImages[fsFolder] || 1;
  if(idx < 1) idx = total;
  if(idx > total) idx = 1;
  fsIndex = idx;
  if(track) {
    if(animate === false) track.classList.add('dragging'); else track.classList.remove('dragging');
    const tx = -(idx - 1) * 100;
    track.style.transform = `translateX(${tx}%)`;
  }
  updateFsDotsActive();
}
function fsSetupDrag(track) {
  let dragging = false;
  let startX = 0;
  let deltaX = 0;
  const getX = (evt) => (evt.touches && evt.touches[0] ? evt.touches[0].clientX : evt.clientX);
  track.addEventListener('mousedown', (e) => { dragging = true; startX = getX(e); deltaX = 0; track.classList.add('dragging'); e.preventDefault(); });
  track.addEventListener('touchstart', (e) => { dragging = true; startX = getX(e); deltaX = 0; track.classList.add('dragging'); }, { passive: false });
  const move = (e) => {
    if(!dragging) return;
    const x = getX(e);
    deltaX = x - startX;
    const w = fsOverlayEl.clientWidth || 1;
    const base = -((fsIndex - 1) * 100);
    const deltaPct = (deltaX / w) * 100;
    track.style.transform = `translateX(${base + deltaPct}%)`;
    if(e.cancelable) e.preventDefault();
  };
  track.addEventListener('mousemove', move);
  track.addEventListener('touchmove', move, { passive: false });
  const end = () => {
    if(!dragging) return;
    track.classList.remove('dragging');
    const w = fsOverlayEl.clientWidth || 1;
    const threshold = Math.max(40, w * 0.15);
    if(deltaX > threshold) fsPrev();
    else if(deltaX < -threshold) fsNext();
    else fsShowIndex(fsIndex, true);
    dragging = false;
  };
  track.addEventListener('mouseup', end);
  track.addEventListener('mouseleave', end);
  track.addEventListener('touchend', end);
  track.addEventListener('touchcancel', end);
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
  smoothScrollToSectionId('contact');
});

if(btnGoToProjects && btnGoToProjects.length) {
  for(let i = 0; i < btnGoToProjects.length; i++) {
    btnGoToProjects[i].addEventListener('click', () => smoothScrollToSectionId('projects'));
  }
}


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
  try {
    const canvas = document.getElementById('pong_canvas');
    if(canvas) {
      canvas.style.opacity = '0';
      // force reflow to restart transition
      void canvas.offsetWidth;
      canvas.style.opacity = '1';
    }
  } catch(e) {}
  pong.rafId = requestAnimationFrame(loopPong);
}

function stopPong() {
  if(!pong.running) return;
  pong.running = false;
  if(pong.rafId) cancelAnimationFrame(pong.rafId);
  pong.rafId = null;
  if(pong.ctx) pong.ctx.clearRect(0, 0, pong.canvas.width, pong.canvas.height);
  try {
    const canvas = document.getElementById('pong_canvas');
    if(canvas) {
      canvas.style.opacity = '0';
    }
  } catch(e) {}
}