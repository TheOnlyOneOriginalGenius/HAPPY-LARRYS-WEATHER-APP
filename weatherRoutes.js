const router = require('express').Router();
const axios = require('axios');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const API_KEY = 'your_openweather_api_key';
const historyFile = './searchHistory.json';

router.get('/history', (req, res) => {
  fs.readFile(historyFile, (err, data) => {
    if (err) return res.status(500).send('Error loading history');
    res.json(JSON.parse(data));
  });
});

router.post('/', async (req, res) => {
  const { city } = req.body;

  let history = [];
  try {
    history = JSON.parse(fs.readFileSync(historyFile));
  } catch {}

  if (!history.some(entry => entry.name.toLowerCase() === city.toLowerCase())) {
    history.push({ id: uuidv4(), name: city });
    fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));
  }

  try {
    const currentRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`);
    const forecastRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`);

    const forecastData = forecastRes.data.list.filter((_, i) => i % 8 === 0).map(day => ({
      date: new Date(day.dt_txt).toLocaleDateString(),
      temp: day.main.temp,
      humidity: day.main.humidity,
      wind: day.wind.speed,
      icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
      description: day.weather[0].description
    }));

    res.json({
      current: {
        city: currentRes.data.name,
        date: new Date().toLocaleDateString(),
        temp: currentRes.data.main.temp,
        humidity: currentRes.data.main.humidity,
        wind: currentRes.data.wind.speed,
        icon: `https://openweathermap.org/img/wn/${currentRes.data.weather[0].icon}@2x.png`,
        description: currentRes.data.weather[0].description
      },
      forecast: forecastData
    });

  } catch (err) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

module.exports = router;
