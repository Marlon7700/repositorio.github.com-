// Cambiar entre modo claro y oscuro
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.querySelector("header").classList.toggle("dark-mode");
  document.querySelector("nav").classList.toggle("dark-mode");
  document.querySelectorAll("section").forEach(section => section.classList.toggle("dark-mode"));
  document.querySelector("footer").classList.toggle("dark-mode");
});

// Selector de idioma
document.getElementById("language-selector").addEventListener("change", (event) => {
  const selectedLanguage = event.target.value;
  const elements = document.querySelectorAll("[data-lang]");

  // Traducciones
  const translations = {
    es: {
      about: "Sobre mí",
      skills: "Habilidades",
      projects: "Proyectos",
      contact: "Contacto",
      "about-title": "Sobre mí",
      "about-text": "Soy Marlon Enrique Pérez Cañizares, estudiante de Ingeniería de Sistemas apasionado por la tecnología, el desarrollo web y la resolución de problemas complejos.",
      "skills-title": "Habilidades",
      skill1: "Programación en Python, JavaScript y C++",
      skill2: "Desarrollo web con HTML, CSS y JavaScript",
      skill3: "Diseño y modelado de bases de datos",
      skill4: "Resolución de problemas algorítmicos",
      "projects-title": "Proyectos",
      "project1-title": "Proyecto 1: Sistema de Gestión de Inventarios",
      "project1-text": "Un sistema desarrollado para optimizar la gestión de inventarios utilizando tecnologías web.",
      "project2-title": "Proyecto 2: Plataforma Educativa",
      "project2-text": "Una plataforma para estudiantes de primaria con actividades interactivas y contenido educativo.",
      "contact-title": "Contacto",
      "contact-text": "Si deseas contactarme, puedes escribirme a:"
    },
    en: {
      about: "About Me",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      "about-title": "About Me",
      "about-text": "I am Marlon Enrique Pérez Cañizares, a Systems Engineering student passionate about technology, web development, and solving complex problems.",
      "skills-title": "Skills",
      skill1: "Programming in Python, JavaScript, and C++",
      skill2: "Web development with HTML, CSS, and JavaScript",
      skill3: "Database design and modeling",
      skill4: "Algorithmic problem-solving",
      "projects-title": "Projects",
      "project1-title": "Project 1: Inventory Management System",
      "project1-text": "A system developed to optimize inventory management using web technologies.",
      "project2-title": "Project 2: Educational Platform",
      "project2-text": "A platform for elementary students with interactive activities and educational content.",
      "contact-title": "Contact",
      "contact-text": "If you want to contact me, you can write to:"
    },
    pt: {
      about: "Sobre mim",
      skills: "Habilidades",
      projects: "Projetos",
      contact: "Contato",
      "about-title": "Sobre mim",
      "about-text": "Sou Marlon Enrique Pérez Cañizares, estudante de Engenharia de Sistemas apaixonado por tecnologia, desenvolvimento web e resolução de problemas complexos.",
      "skills-title": "Habilidades",
      skill1: "Programação em Python, JavaScript e C++",
      skill2: "Desenvolvimento web com HTML, CSS e JavaScript",
      skill3: "Design e modelagem de bancos de dados",
      skill4: "Resolução de problemas algorítmicos",
      "projects-title": "Projetos",
      "project1-title": "Projeto 1: Sistema de Gestão de Inventário",
      "project1-text": "Um sistema desenvolvido para otimizar a gestão de inventários usando tecnologias web.",
      "project2-title": "Projeto 2: Plataforma Educacional",
      "project2-text": "Uma plataforma para estudantes do ensino fundamental com atividades interativas e conteúdo educacional.",
      "contact-title": "Contato",
      "contact-text": "Se você deseja entrar em contato comigo, pode escrever para:"
    }
  };

  // Aplicar traducciones
  elements.forEach((element) => {
    const key = element.getAttribute("data-lang");
    if (translations[selectedLanguage][key]) {
      element.textContent = translations[selectedLanguage][key];
    }
  });
});

// Activar modo de Navidad
document.getElementById('christmas-mode-toggle').addEventListener('click', () => {
  document.body.classList.toggle('christmas-mode');

  if (document.body.classList.contains('christmas-mode')) {
    // Crear copos de nieve dinámicamente
    for (let i = 0; i < 50; i++) {
      let snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      snowflake.textContent = '❄'; // Símbolo de copo de nieve
      snowflake.style.position = 'absolute';
      snowflake.style.left = `${Math.random() * 100}vw`;
      snowflake.style.top = `${Math.random() * 100}vh`;
      snowflake.style.animationDuration = `${2 + Math.random() * 5}s`;
      snowflake.style.opacity = 0.5 + Math.random() * 0.5;
      snowflake.style.fontSize = `${12 + Math.random() * 12}px`;
      document.body.appendChild(snowflake);
    }
  } else {
    document.querySelectorAll('.snowflake').forEach(flake => flake.remove());
  }
});

// Función para iniciar el reconocimiento de voz
const startVoiceButton = document.getElementById('start-voice');

function startVoiceAssistant() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Tu navegador no soporta el reconocimiento de voz.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'es-ES'; // Configuración para español
  recognition.continuous = false;

  recognition.onstart = () => {
    console.log("Reconocimiento de voz activado.");
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    console.log(`Comando recibido: ${transcript}`);
    processCommand(transcript); // Procesar el comando
  };

  recognition.onerror = (event) => {
    console.error("Error de reconocimiento de voz:", event.error);
  };

  recognition.start();
}

// Función para hacer que el asistente hable
function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = 'es-ES'; // Configuración de idioma
  speech.volume = 1; // Volumen máximo
  speech.rate = 1; // Velocidad de habla
  speech.pitch = 1; // Tonalidad

  speech.onstart = () => console.log('El asistente está hablando...');
  speech.onend = () => console.log('El asistente terminó de hablar.');

  window.speechSynthesis.speak(speech);
}

// Función para reproducir música en YouTube y mostrar todos los resultados
document.getElementById('start-voice').addEventListener('click', async () => {
  const query = prompt("Ingresa el nombre de la canción o artista:");
  if (query) {
    const apiKey = 'AIzaSyC0yUccAoDSXisXGWh-hwS5VIgIALYBtao'; // Reemplaza con tu clave de API de YouTube
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=10&key=${apiKey}`;

    try {
      const response = await fetch(searchUrl);
      const data = await response.json();
      console.log("Datos de la API de YouTube:", data); // Debugging line
      const items = data.items;

      if (items.length > 0) {
        let resultsText = "Se encontraron los siguientes videos:\n";
        items.forEach((item, index) => {
          const videoTitle = item.snippet.title;
          const videoChannel = item.snippet.channelTitle;
          const videoUrl = `https://www.youtube.com/watch?v=${item.id.videoId}`;
          resultsText += `${index + 1}. ${videoTitle} - ${videoChannel}\n`;
        });

        alert(resultsText);

        const videoChoice = prompt("Ingresa el número del video que deseas reproducir:");
        if (videoChoice && !isNaN(videoChoice) && videoChoice > 0 && videoChoice <= items.length) {
          const chosenVideo = items[videoChoice - 1];
          const videoId = chosenVideo.id.videoId;
          document.getElementById('youtube-player').src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
          document.getElementById('music-player-container').style.display = 'block';
          speak(`Reproduciendo la canción: ${chosenVideo.snippet.title}`);
        } else {
          speak("Selección no válida.");
        }
      } else {
        speak("No se encontraron resultados.");
      }
    } catch (error) {
      console.error("Error al buscar videos en YouTube:", error);
      speak("Hubo un problema al buscar videos.");
    }
  }
});

// Iniciar el asistente de voz al hacer clic
startVoiceButton.addEventListener('click', startVoiceAssistant);





