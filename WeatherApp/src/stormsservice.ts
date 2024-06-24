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

async function addStorm( storm: string, discription: string) {
    const db = await openDb();

    try { 
            console.log("Storm: " + storm);
            await db.run('INSERT INTO storms (storm, discription) VALUES (?, ?)', [storm, discription]);
            console.log('Inserted storms sucessfully');
        
    } catch (error) {
        console.error('Error inserting Storm:', error);
    } finally {
        await db.close();
    }
}

async function createStormTable() {
    const db = await openDb();

    await db.exec(`
        CREATE TABLE IF NOT EXISTS storms (
        storm text,    
        discription text
        )
    `);

    await db.close();
}

async function getStorm(storm: string) {
    const db = await openDb();
    console.log("getCitys");
    try {
        const citys = await db.all('SELECT discription FROM storms Where storm = ?', storm);
        console.log("discription: "+ citys);
        return citys;
    } catch (error) {
        console.error('Error retrieving Storms:', error);
        return [];
    } finally {
        await db.close();
    }
}

export { getStorm, addStorm, createStormTable};

async function main() {
    createStormTable();
    addStorm("Hurrikan", "Suchen Sie sofort Schutz in einem sicheren Gebäude. Vermeiden Sie Fenster und bleiben Sie im Inneren.");
    addStorm("Sturm", "Sichern Sie lose Gegenstände im Freien und bleiben Sie im Inneren, wenn möglich.");
    addStorm("Starkregen", "Vermeiden Sie überflutete Gebiete und suchen Sie höher gelegene Orte auf.");
    addStorm("Leichtes Unwetter", "Bleiben Sie informiert und halten Sie sich bereit für mögliche Änderungen der Wetterbedingungen.");





}

main();


