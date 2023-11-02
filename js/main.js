const CONST_GREETINGS = 0;
// const CONST_TECHNOLOGIES = 1;
const CONST_PROJECTS = 1;
const CONST_CONTACT = 3;

// hides all mobile only stuff while user is not in a mobile device
if (!/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    let onlyMobileElements = document.getElementsByClassName("mobile-only");
    for(element in onlyMobileElements) {
      if(typeof onlyMobileElements[element] !== "object")
        break;
      onlyMobileElements[element].hidden = true;
    }
}


const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))