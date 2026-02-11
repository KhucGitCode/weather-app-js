const inputCity = document.getElementById("inputCity");
const searchBtn = document.getElementById("searchBtn");
const resultContainer = document.querySelector(".resultContainer");

const API_KEY = "85ad499fbc28f641e385c5dc57b945b5";

searchBtn.addEventListener("click", async () => {
  const city = inputCity.value.trim();

  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  resultContainer.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    );

    if (!response.ok) {
      throw new Error("city not found");
    }

    const data = await response.json();
    showWeather(data);
  } catch (error) {
    resultContainer.innerHTML = `<p style="color:red;">❌ ${error.message}</p>`;
  }
});

inputCity.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

//display weather
function showWeather(data) {
  const { name } = data;
  const { temp, humidity } = data.main;
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  resultContainer.innerHTML = `
    <h2>${name}</h2>
    <img 
      src="https://openweathermap.org/img/wn/${icon}@2x.png" 
      alt="weather icon"
    />
    <p>🌡️ Temperature: ${temp}°C</p>
    <p>💧 Humidity : ${humidity}%</p>
    <p>🌤️ Condition: ${description}</p>
    `;
}
