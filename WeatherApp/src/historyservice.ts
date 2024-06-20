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

async function addHistroy(userid: number, weatherid: number) {
    const db = await openDb();

    try {
        if(await doesUserIdExists(userid))
        {
            await db.run('INSERT INTO histroy (weatherid, userid) VALUES (?, ?)', [weatherid, userid]);
            console.log('Inserted user sucessfully');
        }
    } catch (error) {
        console.error('Error inserting weather data:', error);
    } 
    await db.close();
}

async function doesUserIdExists(userid: number) {
    const db = await openDb();
    let result;
    try{
        result = await db.get('SELECT 1 FROM users WHERE userid = ?', userid);
    }
    catch (error){
        console.error('Error getting users', error);
    }

    await db.close();
    return !!result;
}



async function createHistroyTable() {
    const db = await openDb();

    await db.exec(`
        CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            weatherid INTEGER,
            userid INTEgER
        )
    `);

    await db.close();
}

async function getHistroy() {
    const db = await openDb();

    try {
        const users = await db.all('SELECT * FROM history');
        return users;
    } catch (error) {
        console.error('Error retrieving the history:', error);
        return [];
    } finally {
        await db.close();
    }
}

export { getHistroy, addHistroy, createHistroyTable };