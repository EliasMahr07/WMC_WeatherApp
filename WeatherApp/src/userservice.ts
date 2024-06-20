import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';
const dbFilename = "database.db";


async function openDb() {
    return open({
        filename: dbFilename,
        driver: sqlite3.Database
    });
}

async function addUsers(username: string, email: number, password: string, apikey: string) {
    const db = await openDb();

    try {
        if(await doesUserExists(username))
        {
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.run('INSERT INTO users (username, email, password, apikey) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, apikey]);
            console.log('Inserted user sucessfully');
        }
        else{
            console.error('User already exists');
        }

    } catch (error) {
        console.error('Error inserting weather data:', error);
    } finally {
        await db.close();
    }
}

async function doesUserExists(username: string) {
    const db = await openDb();
    let result;
    try{
        const result = await db.get('SELECT 1 FROM users WHERE username = ?', username);
    }
    catch (error){
        console.error('Error getting users', error);
    }

    await db.close();
    return !!result;
}

async function createDatabase() {
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

    try {
        const users = await db.all('SELECT * FROM users');
        return users;
    } catch (error) {
        console.error('Error retrieving users:', error);
        return [];
    } finally {
        await db.close();
    }
}

export { getUsers, addUsers, createDatabase };