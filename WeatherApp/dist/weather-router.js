"use strict";
/*import express from 'express';
import { createDatabase } from './database';
import { addWeatherData, getWeatherData } from './weatherservice';
import path from 'path';

const app = express();
const port = 3000;
__dirname = path.resolve();
const rootDir = path.join(__dirname,"./public");

// Middleware, um JSON-Daten zu parsen
app.use(express.json());

// EJS als Template-Engine einrichten
app.set('view engine', 'ejs');

// Route zum Hinzufügen von Wetterdaten
app.post('/add-weather', async (req, res) => {
    const { date, temperature, humidity, room } = req.body;
    await addWeatherData(date, temperature, humidity, room);
    res.send('Weather data added successfully');
});

// Route zum Abrufen und Anzeigen der Wetterdaten
app.get('/weather', async (req, res) => {
    const weatherData = await getWeatherData();
    res.sendFile('index.html', { root:rootDir });
});

app.get('/', (req, res, next) => {
    if (true) {
        res.sendFile('login.html',{root:rootDir});
        console.log("test");
      } else {
      next();
    }
  });
  

// Route für den Root-Pfad
app.get('/', (req, res) => {
    res.redirect('/weather');
});

// Server starten
app.listen(port, async () => {
    await createDatabase();
    console.log(`Server is running at http://localhost:${port}`);
});
*/
