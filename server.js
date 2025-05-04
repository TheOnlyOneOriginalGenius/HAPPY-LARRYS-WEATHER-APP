const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use('/api/weather', require('./routes/weatherRoutes'));

app.listen(3000, () => {
  console.log('🌤 Happy Larry Weather App is live at http://localhost:3000');
});
