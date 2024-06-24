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

async function addCity( userId: number, city: string) {
    const db = await openDb();

    try { 
            console.log("City: " + city);
            await db.run('INSERT INTO citys (city) VALUES (?, ?)', [userId, city]);
            console.log('Inserted city sucessfully');
        
    } catch (error) {
        console.error('Error inserting City:', error);
    } finally {
        await db.close();
    }
}

async function createCitysTable() {
    const db = await openDb();

    await db.exec(`
        CREATE TABLE IF NOT EXISTS citys (
        userId integer,    
        city text
        )
    `);

    await db.close();
}

async function getCitys(userId2: number) {
    const db = await openDb();
    console.log("getCitys");
    try {
        const citys = await db.all('SELECT * FROM citys Where userId = ?', userId2);
        console.log("citys: "+ citys);
        return citys;
    } catch (error) {
        console.error('Error retrieving Citys:', error);
        return [];
    } finally {
        await db.close();
    }
}

export { getCitys, addCity, createCitysTable};

async function main() {
    addCity(1,"Wien");
    console.log(await getCitys(1));
}

main();


