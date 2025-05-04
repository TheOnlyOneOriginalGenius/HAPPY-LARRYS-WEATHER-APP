# HAPPY-LARRYS-WEATHER-APP
🌤 Happy Larry's Weather App 🌧

Overview

Happy Larry's Weather App is a user-friendly weather dashboard application designed to help travelers effortlessly view current and future weather conditions for multiple cities. Leveraging the OpenWeather API, this app ensures seamless travel planning and real-time weather updates.

Features

Search Current Weather: View the current temperature, humidity, wind speed, and weather conditions of any city.

5-Day Forecast: Detailed weather predictions with daily icons, temperature, wind speed, and humidity.

Search History: Automatically saves searched cities and enables quick retrieval.

User Story

AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

Acceptance Criteria

When searching for a city, the app displays current and future weather conditions.

City searches are stored and can be easily revisited from the history.

The app provides visual weather icons and descriptive alt-text for accessibility.

All weather data fetched dynamically from the OpenWeather API.

Installation

Step 1: Clone Repository

git clone <repository-url>

Step 2: Navigate to Project Folder

cd happy-larry-weather-app

Step 3: Install Dependencies

npm install

Configuration

Replace 'your_openweather_api_key' in routes/weatherRoutes.js with your OpenWeather API key:

const API_KEY = 'your_actual_openweather_api_key';

Run Application

Start the server with:

node server.js

Open your web browser and visit:

http://localhost:3000

Technologies Used

Frontend: HTML5, CSS3, JavaScript

Backend: Node.js, Express.js

API: OpenWeather API

Dependencies: Axios, CORS, UUID

Data Storage: JSON file (searchHistory.json)

Project Structure

happy-larry-weather-app/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── routes/
│   └── weatherRoutes.js
├── searchHistory.json
├── server.js
└── package.json

API Routes

GET /api/weather/history – Retrieves search history.

POST /api/weather – Adds city to history and fetches weather data.

License

This project is created for educational purposes. Open-source and free to use.

Author

Created by Larry G. Hamilton II
