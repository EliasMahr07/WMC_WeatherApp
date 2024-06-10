import sqlite3 from 'sqlite3';
import {open} from 'sqlite';
import {DB} from './database';
import express from 'express';

interface User{
  id:number,
  name:String,
  age:number
}

async function connectDB(){
  const db = await open({
    filename: './users.db',
    driver :sqlite3.Database
  });
}

async function insertUser(id:number,name:string,age:number):Promise<boolean>{
  try{
    const db = DB.createDBConnection();
    const statment = (await db).prepare('INSERT INTO USERS (id,name,age) VALUES (?1,?2,?3)');
    (await statment).bind({1:id},{2:name},{3:age});
    (await statment).run();
    (await statment).finalize();
    (await db).close;
    return true;
  }catch{
    return false;
  }
}

async function deleteUser(id:number): Promise<boolean>{
  try{
    const db = DB.createDBConnection();
    const statement = (await db).prepare('DELETE FROM users WHERE id = ?1');
    (await statement).bind({1:id});
    (await statement).run();
    (await statement).finalize();
    (await db).close;
    return true;
  }
  catch{
    return false;
  }
}

async function main(){
  DB.createDBConnection();
  insertUser(1,"Tim",16);
  insertUser(2,"Mo",17);
  deleteUser(2);
}
connectDB();
main();

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


