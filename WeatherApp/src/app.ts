import express from 'express';
import { users } from './user-store';
import {addWeatherData, getWeatherData, createDatabase} from './weatherservice';

//import { authRouter } from './auth-router';
//import { isAdmin, isAuthenticated } from './auth-handler';
import path from 'path';

const app = express();
__dirname = path.resolve();
const rootDir = path.join(__dirname,"./public");
app.use(express.json());

app.use('../assets', express.static(path.join(__dirname, 'assets')));
// Route
app.get('/', (req, res, next) => {
  if (true) { 
      res.sendFile('login.html',{root:rootDir});
      console.log("test");
    } else {
    next();
  }
});

app.post('/add-weather', async (req, res) => {
  const { date, temperature, humidity, room } = req.body;
  await addWeatherData(date, temperature, humidity, room);
  res.send('Weather data added successfully');
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
  console.log(`Server läuft auf Port ${port}`);
});

console.log(users);