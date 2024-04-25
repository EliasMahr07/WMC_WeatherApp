import express from 'express';
import { users } from '../data/user-store';
import { authRouter } from './auth-router';

const app = express();

app.use(express.json());
// Route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Verbinde den Router mit deiner Express-App
app.use('/api/auth', authRouter);

// Starte den Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});

console.log(users);
