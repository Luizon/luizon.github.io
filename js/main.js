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
  // CONST_TECHNOLOGIES : 1,
  PROJECTS : 1,
  CONTACT : 3
}
const sections = $('section');
const __body__ = $("#top")[0];
const scrollButtons = $(".btn-scroll");
const scrollToTopButton = $("#btnTop")[0];
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

function scrollToSection(evt, selectedSection = false) {
  console.log(`scroll a ${selectedSection}`);
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

    if(scrollToTopButton.classList.contains("fade-in"))
      scrollToTopButton.classList.remove("fade-in");
    scrollToTopButton.classList.add("fade-out");
    setTimeout( evt => { scrollToTopButton.hidden = true; }, 1000);
  }
  else {
    __body__.style.background = "#420666";
    if(!tetrisPiecesHasBeenMoved)
      moveTetrisPieces();

    if(scrollToTopButton.classList.contains("fade-out"))
      scrollToTopButton.classList.remove("fade-out");
    scrollToTopButton.classList.add("fade-in");
    scrollToTopButton.hidden = false;
  }
};

/////////////////////////////////////
// window events
/////////////////////////////////////
window.onresize = evt => {
  sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
  // console.log("resize")
}
window.onload = evt => {
  // console.log("load")
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
$("#btn_resume").on("click", () => {
  window.location.href = dictionary[language].navbar.resumeUrl;
});


$("#dictionary").ready(function() {
  $('body').fadeIn(100);
});