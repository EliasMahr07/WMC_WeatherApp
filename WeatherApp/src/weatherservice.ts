import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function addWeatherData(date: number, temperature: number, humidity: number, room: string) {
    const db = await open({
        filename: 'database.db',
        driver: sqlite3.Database
    });

    try {
        await db.run('INSERT INTO weather (date, temperature, humidity, room) VALUES (?, ?, ?, ?)', [date, temperature, humidity, room]);
        console.log('Inserted weather data successfully.');
    } catch (error) {
        console.error('Error inserting weather data:', error);
    } finally {
        await db.close();
    }
}

async function deleteAllData() {
    const db = await open({
        filename: 'database.db',
        driver: sqlite3.Database
    });

    try {
        await db.run('DELETE FROM weather');
        console.log('Deleted all weather data successfully.');
    } catch (error) {
        console.error('Error deleting weather data:', error);
    } finally {
        await db.close();
    }
}

async function createDatabase() {
    const db = await open({
        filename: 'database.db',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS weather (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date DATETIME,
            temperature REAL,
            humidity REAL,
            room TEXT
        )
    `);

    await db.close();
}

async function getWeatherData() {
    const db = await open({
        filename: 'database.db',
        driver: sqlite3.Database
    });

    try {
        const weatherData = await db.all('SELECT * FROM weather');
        return weatherData;
    } catch (error) {
        console.error('Error retrieving weather data:', error);
        return [];
    } finally {
        await db.close();
    }
}

export { addWeatherData, getWeatherData, createDatabase, deleteAllData };
