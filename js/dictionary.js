var language = "LANG_ES";

const technologyGlosary = {
  java : "Java",
  git : "Git",
  php : "php",
  postgresql : "PostgreSQL",
  jquery : "jQuery",
  html5 : "HTML 5",
  css3 : "CSS 3",
  bootstrap : "Bootstrap",
  js : "Javascript",
}

var qualities = [
  "👨🏾‍💻 Desarrollador",
  "💡 Mente creativa",
  "🎯 Solucionador de problemas",
  "☕ Cafeinómano",
  "👾 Videojugador",
];

const dictionary = {
  LANG_ES : {
    misc : {
      warning : "Advertencia",
      mobileDeviceMessage : "Esta página web fue creada para dispositivos de escritorio. Es posible que algunas cosas no funcionen correctamente en dispositivos móviles.",
    },
    navbar : {
      switchLanguage : '<img src="../img/flag_usa.svg" alt="flag_USA" class="nav-icon">&nbsp;switch to English',
      resume : "Descargar currículo",
      resumeText : "Aún no amiguito",
    },
    sections : {
      greetings : {
        title : "¡Hola!",
        text : `Soy <b>Luis Cárdenas</b>, <b>ingeniero en software</b> apasionado por la <b>programación</b>, la <b>experiencia de usuario</b> y el <span class="purple">color púrpura</span>. <br><br> Navega en este portafolio para ver más sobre <b>mi trabajo</b>.`,
        networks : {
          github : "Perfil de Github",
          email : "Correo electrónico",
          linkedin : "Perfil de Linkdein",
        },
        qualities : [
          "👨🏾‍💻 Desarrollador",
          "💡 Mente creativa",
          "🎯 Solucionador de problemas",
          "☕ Cafeinómano",
          "👾 Videojugador",
        ],
      },
      projects : {
        title : "Software que he creado",
        systems : {
          cracksCode : {
            title : "Cracks Code",
            technologies : ["java", "git"],
            description : "Editor de código de los cracks. Editor de texto plano simple, con temas predefinidos y uno personalizado, un historial de archivos y la opción de tener varios archivos abiertos a la vez.",
          },
          drp : {
            title : "Sistema DRP",
            technologies : ["php", "js", "postgresql", "jquery", "html5", "css3", "bootstrap"],
            description : "El sistema DRP es un sistema web hecho para subir y ejecutar tareas PHP de forma rápida, fácil y segura. Está protegido por IP de forma que solo personas con permiso pueden usarlo y está hecho para facilitar la ejecución de tareas comunes donde se tenga que trabajar con información de días específicos.",
          },
          LevelMaker : {
            title : "Level Maker",
            technologies : ["js", "git"],
            description : "Level Maker es un juego parecido a Mario Maker: haces niveles que luego puedes jugar y puedes cargar niveles tuyos o de otros para jugar. Solo que al ser Javascript vanilla esa clase de interacciones son un poco más complicadas.",
          },
          ESpeedruN : {
            title : "ESpeedruÑ.com",
            technologies : ["js", "git", "html5", "css3", "bootstrap"],
            description : "ESpeedruÑ.com es uno de mis orgullos personales. Esta página usa la API de speedrun.com para mostrar tablas de marcadores de speedrun de usuarios hispanohablantes. Cosa que usa la comunidad hispana de speedrun y que les incentiva a la sana competencia.",
          },
          crm : {
            title : "CRM Argentina Call Center",
            technologies : ["php", "js", "postgresql", "html5", "css3", "bootstrap"],
            description : "CRM Argentina Call Center es lo que parece: un CRM del call center de Coppel para atender clientes de Argentina. Usa el API de Genesys Cloud para obtener y registrar información ahi, a la vez que guarda información extra de la llamada en el servidor de call center de Coppel.",
          },
          monitorIsa : {
            title : "Monitor ISA Personal",
            technologies : ["php", "java", "postgresql"],
            description : "Una app de escritorio hecha en Java para ver los stats del día actual de los empleados de call center en vivo. Tiene un crud que contempla 3 usuarios: administrador, jefe de área y ejecutivo.",
          },
          monitorKart : {
            title : "Monitor Mario Kart de ISA y NPS",
            technologies : ["php", "js", "postgresql", "html5", "css3", "bootstrap"],
            description : "Monitor mamalón de Mario Kart para ver el ISA o NPS de ejecutivos en vivo a modo de \"carrera\". Muestra top mejores ejecutivos del día arriba y top peores ejecutivos del día abajo.",
          },
        },
      },
    },
  },
  LANG_EN : {
    misc : {
      warning : "Warning",
      mobileDeviceMessage : "This webpage was made for desktop devices. Some stuff may not work correctly in mobile devices.",
    },
    navbar : {
      switchLanguage : '<img src="../img/flag_mx.svg" alt="bandera_MX" class="nav-icon">&nbsp;ver en Español',
      resume: "Download resume",
      resumeText : "Not yet buddy",
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
          cracksCode : {
            title : "Cracks Code",
            technologies : ["java", "git"],
            description : "Cracks Code is a plain text editor where you write your notes. It has a file history, integrated themes and a personalized theme for you own preferences, a tab system and rich text made for Java code. "
            + "Rich text is kind of limitated and this desktop system was not optimized to actually write full codes in, so I don't recommended it for coding (although that's his name, that's kinda ironic I know). "
            + "Cracks Code was named like that for a joke I had with a frined since \"un crack\" in Spanish means something like \"a pro\". So I made this plain text editor calling it \"Cracks code\" because it is \"the code editor for pros\". I found out I actually liked the project, so I decide to conserve it.",
          },
          drp : {
            title : "DRP System",
            technologies : ["php", "js", "postgresql", "jquery", "html5", "css3", "bootstrap"],
            description : "DRP System is a web system to run PHP tasks fast to patch common problems in your work such like: a Java system didn't run correctly, a scheduled PHP task didn't filled a table at 3:00 AM, there are duplicate in some tables, etc. "
            + "DRP System works with his own API made in PHP and an internal cronjobs system from Coppel. I made DRP System for the call center development team in Coppel",
          },
          LevelMaker : {
            title : "Level Maker",
            technologies : ["js", "git"],
            description : "Level Maker is a videogame where you can create your own platform levels and you can save them, load them and of course, play them. This game is a vanilla Javascript web app with no integrations at all.",
          },
          ESpeedruN : {
            title : "ESpeedruÑ.com",
            technologies : ["js", "git", "html5", "css3", "bootstrap"],
            description : "ESpeedruÑ.com is a web page where you can find the hispanic speedrun leaderboards from any game registred in speedrun.com. It works with speedrun.com API and, because of that, it has to deal with their speed problems and limitations. "
            + "I'm not associated with speedrun.com at all, I just made this for the hispanic speedrun community because I love speedrunning and I wish the best for the community.",
          },
          crm : {
            title : "CRM Argentina Call Center",
            technologies : ["php", "js", "postgresql", "html5", "css3", "bootstrap"],
            description : "CRM Argentina Call Center is a responsive CRM made to work correctly in any screen from Coppel's call center, and it was made to replace fully the old one which had a lot of issues (more than just design). It was made in Javascript and jQuery, it works with the Genesys Cloud API in order of get clients information in real time and save extra information from the call in Coppel database and the Genesys Cloud database. "
            + "This system doesn't actually have a name. I called like this because that's what it is; a CRM for the Coppel's call center to support Argentina clients.",
          },
          monitorIsa : {
            title : "Personal ISA Monitor",
            technologies : ["php", "java", "postgresql"],
            description : "A desktop system for operative employees from Coppel's call center. An excecutive can see how good is he doing in the current day and an operative boss can see how good are his employees doing, both with actual information obtained from Genesys Cloud. "
            + "I had to create a Java task (backend side) to get that information every 10 minutos and store it in Coppel database, a PHP API to get that stored information and a desktop Java system to show all this information (and of course, the whole CRUD with 3 kind of users).",
          },
          monitorKart : {
            title : "ISA and NPS Mario Kart Monitor",
            technologies : ["php", "js", "postgresql", "html5", "css3", "bootstrap"],
            description : "A web app which loads information and show a resume of employees stats from Coppel's call center. "
            + "It loads information from Coppel's database using a PHP API (which I made) and it resume that information in order to just show the top best in the top and the top worst in the bottom.",
          },
        },
      },
    },
  },
}

if(window.location.href.includes("EN")) {
  language = "LANG_EN";
  changeTexts();
}

function switchLanguage() {
  if(language == "LANG_EN") {
    language = "LANG_ES";
  }
  else {
    language = "LANG_EN";
  }
  $(".bilingual").hide()
  changeTexts();
  $(".bilingual").fadeIn()
}

function changeTexts() {
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
  $("#btn_drp").attr('aria-label', dictionary[language].sections.projects.systems.drp.title);
  $("#drp").attr('alt', dictionary[language].sections.projects.systems.drp.title);
  $("#btn_crm").attr('aria-label', dictionary[language].sections.projects.systems.crm.title);
  $("#crm").attr('alt', dictionary[language].sections.projects.systems.crm.title);
  $("#btn_monitorIsa").attr('aria-label', dictionary[language].sections.projects.systems.monitorIsa.title);
  $("#monitorIsa").attr('alt', dictionary[language].sections.projects.systems.monitorIsa.title);
  $("#btn_monitorKart").attr('aria-label', dictionary[language].sections.projects.systems.monitorKart.title);
  $("#monitorKart").attr('alt', dictionary[language].sections.projects.systems.monitorKart.title);
}
