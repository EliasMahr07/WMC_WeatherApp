import { Database as Driver } from "sqlite3";
import {open, Database} from "sqlite";
export const dbName = "users.db";

export class DB{
    public static async createDBConnection(): Promise<Database>{
        const db = await open({
            filename: `.${dbName}`,
            driver: Driver
        });
        await DB.enusreTableCreated(db);
        return db;
    }

    private static async enusreTableCreated(connection: Database): Promise<void>{
        await connection.run(
            `CREATE TABLE IF NOT EXISTS users(
            id INTEGER NOT NULL PRIMARY KEY,
            name TEXT,
            age INTEGER
            )`
        )
    }
}
