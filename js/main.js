/////////////////////////////////////
// scrolling
/////////////////////////////////////
const section = {
  GREETINGS : 0,
  // CONST_TECHNOLOGIES : 1,
  PROJECTS : 1,
  CONTACT : 3
}
const sections = document.querySelectorAll('section');
const __body__ = document.getElementById("top");
const scrollButtons = document.querySelectorAll(".btn-scroll");
const scrollToTopButton = document.getElementById("btnTop");
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
  console.log("resize")
}
window.onload = evt => {
  console.log("load")
  sections[section.GREETINGS].scrollIntoView({ behavior: 'smooth' });
}

/////////////////////////////////////
// mobile stuff
/////////////////////////////////////
if (!/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
  let onlyMobileElements = document.getElementsByClassName("mobile-only");
  for(element in onlyMobileElements) {
    if(typeof onlyMobileElements[element] !== "object")
      break;
    onlyMobileElements[element].hidden = true;
  }
}
else {
  scrollToTopButton.classList.add("btn-top-mobile");
}

/////////////////////////////////////
// bootstrap tooltip
/////////////////////////////////////
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
