import { Database as Driver } from "sqlite3";
import { open, Database } from "sqlite";
import * as path from 'path';

export const dbName = "data.db";

export class DB {
    public static async createDBConnection(): Promise<Database> {
        const db = await open({
            filename: path.resolve(__dirname, dbName),
            driver: Driver
        });
        await DB.ensureTableCreated(db);
        await DB.populateInitialData(db);
        return db;
    }

    private static async ensureTableCreated(connection: Database): Promise<void> {
        await connection.run(
            `CREATE TABLE IF NOT EXISTS data (
                location TEXT,
                month TEXT,
                value INTEGER
            )`
        );
        console.log("Erstellt");
    }

    private static async populateInitialData(connection: Database): Promise<void> {
        const row = await connection.get("SELECT COUNT(*) as count FROM data");
        if (row.count === 0) {
            const kitchenData = [10, 15, 3];
            const livingroomData = [5, 8, 3];
            const loc = ['Kitchen', 'Livingroom'];
            const monthLabels = ['Jan', 'Feb', 'März'];

            const insertStatement = `INSERT INTO data (location, month, value) VALUES (?, ?, ?)`;

            for (const location of loc) {
                const data = location === 'Kitchen' ? kitchenData : livingroomData;
                for (let i = 0; i < data.length; i++) {
                    await connection.run(insertStatement, [location, monthLabels[i], data[i]]);
                }
            }
        }
    }

    public static async getData(): Promise<{ [key: string]: { [month: string]: number } }> {
        const db = await DB.createDBConnection();
        const rows = await db.all("SELECT location, month, value FROM data");
        const data: { [key: string]: { [month: string]: number } } = {};

        rows.forEach((row: { location: string; month: string; value: number }) => {
            if (!data[row.location]) {
                data[row.location] = {};
            }
            data[row.location][row.month] = row.value;
        });

        return data;
    }
}
