import express from 'express';
import { users } from '../data/user-store';
import { authRouter } from './auth-router';
import { isAdmin, isAuthenticated } from './auth-handler';
import path from 'path';
import { publishTemperature,subscribeToTemperature } from './mqtt';


const app = express();

app.use(express.json());

app.use('../assets', express.static(path.join(__dirname, 'assets')));
// Route
app.get('/', (req, res, next) => {
  if (false) { 
      res.send('Hello, World!'); 
    } else {
    next();
  }
});

app.get('/adminn', isAuthenticated, isAdmin, (req, res, next) => {
    res.send('Hello, Admin!');
});

app.get('/publish-temperature', (req, res) => {
  const temperature = Math.random() * (21 - 20) + 20;
  publishTemperature(temperature);
  res.send(`Temperatur ${temperature} veröffentlicht`);
});

   

app.use(express.static('public'))
// Verbinde den Router mit deiner Express-App
app.use('/api/auth', authRouter);

// Starte den Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);

});


console.log(users);