const apiKey = "2af9623887d1061572ac089dedbd2d6c";
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");
const loader = document.querySelector("#loader");
const suggestionButtons = document.querySelectorAll("#suggestions button");
const errorMessageContainer = document.querySelector("#error-message");

// Função para obter os dados meteorológicos
const getWeatherData = async (city) => {
  try {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao obter os dados meteorológicos:", error);
    return null;
  }
};

// Função para exibir os dados meteorológicos e alterar o background
const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  if (!data || data.cod === "404") {
    errorMessageContainer.classList.remove("hide");
    return;
  }

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  umidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;
  weatherContainer.classList.remove("hide");

  // Alterar o background do corpo com a imagem da cidade do Unsplash
  try {
    const unsplashResponse = await fetch(`https://api.unsplash.com/photos/random?query=${city}&client_id=NYrkqRoZ2_cr60iZg0vUEqw0POKmB5IXUC6pPVSOrYE`);
    const unsplashData = await unsplashResponse.json();
    document.body.style.backgroundImage = `url(${unsplashData.urls.regular})`;
  } catch (error) {
    console.error("Erro ao obter imagem do Unsplash:", error);
  }
};
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value;
  showWeatherData(city);
});
cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;
    showWeatherData(city);
  }
});
suggestionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.getAttribute("id");
    showWeatherData(city);
  });
});
