const inputCity = document.getElementById("inputCity");
const searchBtn = document.getElementById("searchBtn");
const resultContainer = document.querySelector(".resultContainer");

// ------------------ Greeting Logic ------------------
function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "🌅 Good Morning";
  if (hour < 17) return "☀️ Good Afternoon";
  if (hour < 21) return "🌇 Good Evening";
  return "🌙 Good Night";
}

// ------------------ Continuous Typing Effect ------------------
function typeLoop(element, text, speed = 70) {
  let index = 0;
  let isDeleting = false;

  function loop() {
    const currentText = text.substring(0, index);
    element.textContent = currentText;

    if (!isDeleting) {
      if (index < text.length) {
        index++;
      } else {
        setTimeout(() => (isDeleting = true), 1200);
      }
    } else {
      if (index > 0) {
        index--;
      } else {
        isDeleting = false;
      }
    }

    setTimeout(loop, speed);
  }

  loop();
}

// ------------------ Weather Background Change ------------------
function changeBackground(condition) {
  const body = document.body;

  if (condition.includes("cloud")) {
    body.style.background = "linear-gradient(135deg,#2c3e50,#4ca1af)";
  } 
  else if (condition.includes("rain")) {
    body.style.background = "linear-gradient(135deg,#232526,#414345)";
  } 
  else if (condition.includes("clear")) {
    body.style.background = "linear-gradient(135deg,#2980b9,#6dd5fa)";
  } 
  else if (condition.includes("smoke") || condition.includes("mist")) {
    body.style.background = "linear-gradient(135deg,#3e5151,#decba4)";
  } 
  else {
    body.style.background = "linear-gradient(135deg,#0f2027,#203a43,#2c5364)";
  }
}

// ------------------ Fetch Weather ------------------
async function fetchWeather(city) {
  resultContainer.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    resultContainer.innerHTML = `
      <p style="color:red;">❌ ${error.message}</p>
    `;
  }
}

// ------------------ Display Weather ------------------
function displayWeather(data) {
  const { name } = data;
  const { temp, humidity } = data.main;
  const description = data.weather[0].description.toLowerCase();
  const icon = data.weather[0].icon;

  const greetingText = getGreeting() + ", Khushi 😊";

  resultContainer.innerHTML = `
    <div class="weather-card">
      <h3 class="greeting"></h3>
      <h2>${name}</h2>
      <img 
        src="https://openweathermap.org/img/wn/${icon}@2x.png" 
        alt="weather icon"
      />
      <p>🌡️ Temperature: ${temp}°C</p>
      <p>💧 Humidity: ${humidity}%</p>
      <p>🌤️ Condition: ${description}</p>
    </div>
  `;

  const greetingElement = document.querySelector(".greeting");
  const card = document.querySelector(".weather-card");

  // slide animation
  setTimeout(() => {
    card.classList.add("show");
  }, 100);

  // continuous typing
  typeLoop(greetingElement, greetingText, 80);

  // change background
  changeBackground(description);
}

// ------------------ Events ------------------
searchBtn.addEventListener("click", () => {
  const city = inputCity.value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  fetchWeather(city);
});

inputCity.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
