import express from 'express';
import { users } from './user-store';
import {addWeatherData, getWeatherData, createDatabase, deleteAllData} from './weatherservice';
import {getHistroy, addHistroy, createHistroyTable} from './historyservice';
import {getUsers, addUsers, createUserTable, login, deleteUser, changePwd, changeRole} from './userservice';
const dayjs = require('dayjs');
import { addCity, getCitys } from './weatherworldservice';
//import { authRouter } from './auth-router';
//import { isAdmin, isAuthenticated } from './auth-handler';
import path from 'path';
import { addStorm, getStorm } from './stormsservice';

const app = express();
__dirname = path.resolve();
const rootDir = path.join(__dirname,"./public");
app.use(express.json());

app.use('../assets', express.static(path.join(__dirname, 'assets')));
// Route
app.get('/', (req, res, next) => {
  if (true) { 
      res.sendFile('index.html',{root:rootDir});
    } else {
    next();
  }
});

app.post('/add-weather', async (req, res) => {
  const { temperature, humidity, room } = req.body;
  const nowDate = dayjs().toISOString();
  await addWeatherData(nowDate, temperature, humidity, room);
  res.send('Weather data added successfully');
});

app.get('/get-weather', async (req, res) => {
  try {
    const weatherData = await getWeatherData();
    res.json(weatherData); // Sendet die Wetterdaten als JSON zurück
  } catch (error) {
    res.status(500).send('Ein Fehler ist aufgetreten beim Abrufen der Wetterdaten');
  }
});
app.get('/get-getUser', async (req, res) => {
  try {
    const weatherData = await getUsers();
    res.json(weatherData); // Sendet die Wetterdaten als JSON zurück
  } catch (error) {
    res.status(500).send('Ein Fehler ist aufgetreten beim Abrufen der User');
  }
});

app.post('/add-city', async (req, res) => {
  const { userid, city } = req.body;
  await addCity(userid, city);
  res.send('City data added successfully');
});
app.get('/get-getCitys', async (req, res) => {
  try {
    const {userid} = req.body;
    const weatherData = await getCitys(userid);
    res.json(weatherData); // Sendet die Wetterdaten als JSON zurück
  } catch (error) {
    res.status(500).send('Ein Fehler ist aufgetreten beim Abrufen der Städte');
  }
});


app.get('/get-getStorm', async (req, res) => {
  try {
    const {stormname} = req.body;
    const weatherData = await getStorm(stormname);
    res.json(weatherData); // Sendet die Wetterdaten als JSON zurück
  } catch (error) {
    res.status(500).send('Ein Fehler ist aufgetreten beim Abrufen der Storms');
  }
});

app.post('/delete-all-data', async (req, res) => {
  try {
      await deleteAllData();
      res.json({ success: true });
  } catch (error) {
      console.error('Error deleting weather data:', error);
      res.json({ success: false });
  }
});

app.get('/weather', async (req, res) => {
  //const weatherData = await getWeatherData();
  res.sendFile('index.html',{root:rootDir});
  //res.render('index.html', { weatherData });
});
/*
app.get('/admin', isAuthenticated, isAdmin, (req, res, next) => {
    res.send('Hello, Admin!');
});
*/
app.use(express.static('public'));
// Verbinde den Router mit deiner Express-App
//app.use('/api/auth', authRouter);

// Starte den Server
const port = process.env.PORT || 3000;
app.listen(port, async () => {
  await createDatabase();
  await createHistroyTable();
  await createUserTable();
  await deleteUser("Leopoldd");
  //await addUsers("testapi", "leopold.mistelberger@gmx.at", "1234", "admin");
  //await login("Leopold", "1234");
  //await changePwd("Leopoldd", "12345");
  //await changeRole("Leopolddd", "client");

  console.log(`Server läuft auf Port ${port}`);
});

console.log(users);