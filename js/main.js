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
// bootstrap tooltip
/////////////////////////////////////
const tooltipTriggerList = $('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

/////////////////////////////////////
// tetris project modals
/////////////////////////////////////

$("#btn_cracksCode").on("click", () => {
  bootbox.dialog({
    title: "to-do: change this modal UI",
    message: dictionary[language].sections.projects.systems.cracksCode.description,
    onEscape : true,
  });
});
$("#btn_crm").on("click", () => {
  bootbox.dialog({
    title: "to-do: change this modal UI",
    message: dictionary[language].sections.projects.systems.crm.description,
    onEscape : true,
  });
});
$("#btn_drp").on("click", () => {
  bootbox.dialog({
    title: "to-do: change this modal UI",
    message: dictionary[language].sections.projects.systems.drp.description,
    onEscape : true,
  });
});
$("#btn_ESpeedruN").on("click", () => {
  bootbox.dialog({
    title: "to-do: change this modal UI",
    message: dictionary[language].sections.projects.systems.ESpeedruN.description,
    onEscape : true,
  });
});
$("#btn_LevelMaker").on("click", () => {
  bootbox.dialog({
    title: "to-do: change this modal UI",
    message: dictionary[language].sections.projects.systems.LevelMaker.description,
    onEscape : true,
  });
});
$("#btn_monitorIsa").on("click", () => {
  bootbox.dialog({
    title: "to-do: change this modal UI",
    message: dictionary[language].sections.projects.systems.monitorIsa.description,
    onEscape : true,
  });
});
$("#btn_monitorKart").on("click", () => {
  bootbox.dialog({
    title: "to-do: change this modal UI",
    message: dictionary[language].sections.projects.systems.monitorKart.description,
    onEscape : true,
  });
});
$("#btn_resume").on("click", () => {
  bootbox.dialog({
    message: dictionary[language].navbar.resumeText,
    backdrop: true,
    buttons: {
      ok: {
        label: 'Aceptar',
        className: 'btn-primary',
      },
    },
    className: 'bootbox-no-title',
  });
});


$("#dictionary").ready(function() {
  $('body').fadeIn(100);

  console.log('a')
});