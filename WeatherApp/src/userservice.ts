import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';
import { resourceUsage } from 'process';
const dbFilename = "database.db";
import crypto from 'crypto';
import express from "express";
import { StatusCodes } from "http-status-codes";

export interface User {
    email: string;
    password: string;
    username: string;
    role: string;
    apiKey: string;
    id: number;
  }

async function openDb() {
    return open({
        filename: dbFilename,
        driver: sqlite3.Database
    });
}

export async function createUser(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const user: User = req.body;
  
    try {
      const db = await openDb();
      const stmt = await db.prepare(
        "INSERT INTO Users (username, email, password, apikey, role) VALUES (?1, ?2, ?3, ?4, 5?)"
      );
      await stmt.bind({
        1: user.username,
        2: user.email,
        3: bcrypt.hashSync(user.password, saltRounds),
        4: user.apiKey,
        5: user.role
      });
      await stmt.run();
      await stmt.finalize();
      await db.close();
      console.log(await getUsers());
      res.status(StatusCodes.OK).send("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  


async function addUser(username: string, email: string, password: string, role: String) {
    console.log("=================ADD=USER=================")
    const db = await openDb();

    try {
        if(await doesUserExists(username)== false)
        {   
            console.log("Username: " + username + "does not exists");
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("normal: " + password + " hash: "+ hashedPassword);
            const apiKey = generateApiKey();
            await db.run('INSERT INTO users (username, email, password, apikey, role) VALUES (?, ?, ?, ?, ?)', [username, email, hashedPassword, apiKey, role]);
            console.log('Inserted user sucessfully');
        }
        else{
            console.log('User already exists'+ username);
        }

    } catch (error) {
        console.error('Error inserting weather data:', error);
    } finally {
        await db.close();
    }
}

async function deleteUser(username: string){
    console.log("=================DELETE=USER=================")
    const db = await openDb();
    const result = await db.run('DELETE FROM users where username = ?', username);
    await db.close();
    
    if (result.changes != 0) {
        console.log(`User ${username} deleted successfully`);
    } 
    else {
        console.log(`User ${username} not found`);
    }
}

async function changeRole(username: string, role: string){
    console.log("=================CHANGE=ROLE=================")

    if(role.toLowerCase() == "admin" || role.toLowerCase() == "client"){

        const db = await openDb();
        const result = await db.run('UPDATE users SET role = ? WHERE username = ?', role, username);
        await db.close();

        if (result.changes === 0) {
            console.log(`User ${username} role not changed`);
        }
        else{
            console.log(`User ${username} changed role to ${role}`);
        }
        return;
    }
    console.log("no valid role: " + role);
}

function generateApiKey(): string {
    return crypto.randomBytes(10).toString('hex'); // Erzeugt einen 64-stelligen Hex-String
}

async function changePwd(username:string, newPwd: string){
    console.log("=================CHANGE=PASSWORD=================")
    const db = await openDb();
    const hashedPwd = await bcrypt.hash(newPwd, 10); // Passwort hashen

    const result = await db.run('UPDATE users SET password = ? WHERE username = ?', hashedPwd, username);

    await db.close();

    if (result.changes === 0) {
        console.log(`User ${username} not found`);
    }
    else{
        console.log(`User ${username} changed pwd to ${newPwd}`);
    }


}

async function login(username: string, password: string) :Promise<boolean> {
    console.log("=================LOGIN=================")
    const db = await openDb();
    const user = await db.get('SELECT password FROM users WHERE username = ?', username);
    await db.close();
    console.log("User LOGIN: "+user);
    console.log("User pwd: " + user.password);
    if (user) {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        console.log("is password correct: " + isPasswordCorrect);
        return true;
    } else {
        console.log("password is incorrect");
        return false;
    }
}

async function doesUserExists(username: string) {
    const db = await openDb();
    let result;
    try{
        result = await db.get('SELECT * FROM users WHERE username = ?', username);
        console.log("result does username exist: " + result);
    }
    catch (error){
        console.log('Error getting users', error);
    }
    
    await db.close();
    if(result == undefined){
        console.log("return DoesUser exist: false");
        return false;
    }
    console.log("return DoesUser exist: true");
    return true;
}

async function createUserTable() {
    const db = await openDb();

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            userid INTEGER PRIMARY KEY AUTOINCREMENT,
            username text,
            email Text,
            password Text,
            role Text,
            apikey Text
        )
    `);

    await db.close();
}

async function getUsers(): Promise<User[]> {
    try {
      const db = await openDb();
      const users = await db.all<User[]>("SELECT * FROM User");
    
      await db.close();
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
}

export { getUsers, addUser, createUserTable, login, deleteUser, changePwd, changeRole};

async function main() {
    let tmp = getUsers();
    console.log(tmp);
}

main();


