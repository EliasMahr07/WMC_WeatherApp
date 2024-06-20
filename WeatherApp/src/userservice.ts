import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';
import { resourceUsage } from 'process';
const dbFilename = "database.db";


async function openDb() {
    return open({
        filename: dbFilename,
        driver: sqlite3.Database
    });
}

async function addUsers(username: string, email: string, password: string, apikey: string, role: String) {
    const db = await openDb();

    try {
        if(await doesUserExists(username)== false)
        {   
            console.log("Username: " + username + "does not exists");
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("normal: " + password + " hash: "+ hashedPassword);
            await db.run('INSERT INTO users (username, email, password, apikey, role) VALUES (?, ?, ?, ?, ?)', [username, email, hashedPassword, apikey, role]);
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

async function login(username: string, password: string){
    const db = await openDb();
    const user = await db.get('SELECT password FROM users WHERE username = ?', username);
    await db.close();
    console.log("User LOGIN: "+user);
    console.log("User pwd: " + user.password);
    if (user) {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        console.log("is password correct: " + isPasswordCorrect);
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

async function getUsers() {
    const db = await openDb();
    console.log("getUsers");
    try {
        const users = await db.all('SELECT * FROM users');
        console.log("users: "+ users);
        return users;
    } catch (error) {
        console.error('Error retrieving users:', error);
        return [];
    } finally {
        await db.close();
    }
}

export { getUsers, addUsers, createUserTable, login };

