document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    fetchWeather(city);
  });
  
  async function fetchWeather(city) {
    const response = await fetch('/api/weather', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ city })
    });
  
    const data = await response.json();
    displayWeather(data);
    loadHistory();
  }
  
  function displayWeather(data) {
    const current = document.getElementById('currentWeather');
    const forecast = document.getElementById('forecast');
  
    current.innerHTML = `
      <div>
        <h3>${data.current.city} (${data.current.date})</h3>
        <img src="${data.current.icon}" alt="${data.current.description}">
        <p>Temp: ${data.current.temp}°F</p>
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Wind: ${data.current.wind} MPH</p>
      </div>`;
  
    forecast.innerHTML = data.forecast.map(day => `
      <div>
        <h4>${day.date}</h4>
        <img src="${day.icon}" alt="${day.description}">
        <p>Temp: ${day.temp}°F</p>
        <p>Humidity: ${day.humidity}%</p>
        <p>Wind: ${day.wind} MPH</p>
      </div>`).join('');
  }
  
  async function loadHistory() {
    const response = await fetch('/api/weather/history');
    const history = await response.json();
  
    const historyEl = document.getElementById('searchHistory');
    historyEl.innerHTML = history.map(city =>
      `<li onclick="fetchWeather('${city.name}')">${city.name}</li>`
    ).join('');
  }
  
  loadHistory();
  
