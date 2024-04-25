import express from 'express';
import { users } from '../data/user-store';
import { authRouter } from './auth-router';
import { isAdmin, isAuthenticated } from './auth-handler';

const app = express();

app.use(express.json());
// Route
app.get('/', (req, res, next) => {
  if (false) { 
      res.send('Hello, World!'); 
    } else {
    next();
  }
});

app.get('/admin', isAuthenticated, isAdmin, (req, res, next) => {
    res.send('Hello, Admin!');
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