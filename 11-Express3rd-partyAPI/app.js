const express = require('express');
const https = require('https');
const path = require('path');

const app = express();
const PORT = 3000;
//estoy teniendo problemas con esta APIKEY, como que no quiere funcionar, o talvez no es la correcta para usar el servicio gratuito?, creo que ya me subscribi al 
//gratis, pero no cambio nada :<
const apiKey = 'b4d39bf3b25fce1bbe38c26c8d5dc09e';

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
  const query = req.body.cityName;
  const unit = 'metric'; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${apiKey}&units=${unit}`;

  https.get(url, (response) => {
    let rawData = '';

    
    response.on('data', (chunk) => {
      rawData += chunk;
    });

    response.on('end', () => {
      try {
        const weatherData = JSON.parse(rawData);

        
        if (response.statusCode !== 200 || weatherData.cod != 200) {
          return res.send(`
            <h1>Error: ${weatherData.message || 'City not found or invalid request'}</h1>
            <p>Code: ${weatherData.cod || response.statusCode}</p>
            <br>
            <a href="/">Back to Home</a>
          `);
        }

        
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

        
        res.writeHeader(200, { "Content-Type": "text/html" });
        res.write(`<h3>The weather is currently ${description}</h3>`);
        res.write(`<h1>The temperature in ${query} is ${temp}&#176;C</h1>`);
        res.write(`<img src="${imageURL}" alt="${description}">`);
        res.write(`<br><br><a href="/">Back to Home Page</a>`);
        res.send();

      } catch (err) {
        console.error("Error parsing JSON response:", err.message);
        res.send(`
          <h1>An error occurred while processing the weather data.</h1>
          <br>
          <a href="/">Back to Home</a>
        `);
      }
    });

  }).on('error', (e) => {
    
    console.error("HTTPS request error:", e.message);
    res.send(`
      <h1>Failed to connect to the Weather Service.</h1>
      <p>${e.message}</p>
      <br>
      <a href="/">Back to Home</a>
    `);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});