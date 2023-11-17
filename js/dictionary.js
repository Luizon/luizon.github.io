var qualities = [
  "👨🏾‍💻 Desarollador",
  "💡 Mente creativa",
  "🎯 Solucionador de problemas",
  "☕ Cafeinómano",
  "👾 Videojugador",
];

const dictionary = {
  LANG_EN : {
    navbar : {
      switchLanguage : '<img src="../img/flag_mx.svg" alt="bandera_MX" class="nav-icon"> ver en Español',
      resume: "Download resume",
      resumeHref: "javascript:alert('Not yet buddy')",
    },
    sections : {
      greetings : {
        title : "Hi there!",
        text : `I'm <b>Luis Cárdenas</b>, a <b>software engineer</b> passionate about <b>coding</b>, <b>user experience</b> and the <span class="purple">color purple</span>. <br><br> Browse in this portfolio to see more about <b>my work</b>.`,
        networks : {
          github : "Github profile",
          email : "email",
          linkedin : "Linkdein profile",
        },
        qualities : [
          "👨🏾‍💻 Developer",
          "💡 Creative mind",
          "🎯 Problem solver",
          "☕ Coffeeholic",
          "👾 Gamer",
        ],
      },
      projects : {
        title : "Software I've made",
        systems : {
          drp : "DRP System",
          crm : "CRM Argentina Call Center",
          monitorIsa : "Personal ISA Monitor",
          monitorKart : "ISA and NPS Mario Kart Monitor",
        },
      },
    },
  },
}

if(window.location.href.includes("EN")) {
  changeTexts("LANG_EN");
}

function changeTexts(language) {
  // navbar
  $("#navbar_resumeHref").href = dictionary[language].navbar.resumeHref;
  
  $("#navbar_resume").text(dictionary[language].navbar.resume);
  $("#navbar_switchLanguage").html(dictionary[language].navbar.switchLanguage);
  
  // greetings section
  $("#greetings_title").text(dictionary[language].sections.greetings.title);
  $("#greetings_text").html(dictionary[language].sections.greetings.text);
  $("#greetings_github1").attr('title', dictionary[language].sections.greetings.networks.github);
  new bootstrap.Tooltip($("#greetings_github1"));
  $("#greetings_email1").attr('title', dictionary[language].sections.greetings.networks.email);
  new bootstrap.Tooltip($("#greetings_email1"));
  $("#greetings_linkedin1").attr('title', dictionary[language].sections.greetings.networks.linkedin);
  new bootstrap.Tooltip($("#greetings_linkedin1"));
  $("#greetings_github2").attr('title', dictionary[language].sections.greetings.networks.github);
  new bootstrap.Tooltip($("#greetings_github2"));
  $("#greetings_email2").attr('title', dictionary[language].sections.greetings.networks.email);
  new bootstrap.Tooltip($("#greetings_email2"));
  $("#greetings_linkedin2").attr('title', dictionary[language].sections.greetings.networks.linkedin);
  new bootstrap.Tooltip($("#greetings_linkedin2"));
  qualities = dictionary[language].sections.greetings.qualities;
  
  // project (tetris) section
  $("#projects_title").text(dictionary[language].sections.projects.title);
  $("#btn_drp").attr('aria-label', dictionary[language].sections.projects.systems.drp);
  $("#drp").attr('alt', dictionary[language].sections.projects.systems.drp);
  $("#btn_crm").attr('aria-label', dictionary[language].sections.projects.systems.crm);
  $("#crm").attr('alt', dictionary[language].sections.projects.systems.crm);
  $("#btn_monitorIsa").attr('aria-label', dictionary[language].sections.projects.systems.monitorIsa);
  $("#monitorIsa").attr('alt', dictionary[language].sections.projects.systems.monitorIsa);
  $("#btn_monitorKart").attr('aria-label', dictionary[language].sections.projects.systems.monitorKart);
  $("#monitorKart").attr('alt', dictionary[language].sections.projects.systems.monitorKart);
}
