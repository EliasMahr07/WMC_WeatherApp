import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";
import fs from "fs";
import bcrypt from "bcrypt";
import express from "express";
import { StatusCodes } from "http-status-codes";

const saltRounds = 10;

export interface User {
    email: string;
    password: string;
    username: string;
    role: string;
    apiKey: string;
    id: number;
}


// Define the path to the database file using an absolute path
const dbFileName = path.resolve(__dirname, "database.db");

// Ensure the directory exists
const dbDir = path.dirname(dbFileName);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export class User_DB {
  public static async createDBConnection(): Promise<Database> {
    try {
      const db = await open({
        filename: dbFileName,
        driver: sqlite3.Database,
      });
      await User_DB.ensureTablesCreated(db);
      return db;
    } catch (error) {
      console.error("Error creating database connection:", error);
      throw error;
    }
  }

  private static async ensureTablesCreated(
    connection: Database
  ): Promise<void> {
    try {
      await connection.run(
        `CREATE TABLE IF NOT EXISTS users (
            userid INTEGER PRIMARY KEY AUTOINCREMENT,
            username text,
            email Text,
            password Text,
            role Text,
            apikey Text
        )`
      );
    } catch (error) {
      console.error("Error ensuring tables creation:", error);
      throw error;
    }
  }
}

export async function createUser(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const user: User = req.body;

  try {
    const db = await User_DB.createDBConnection();
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


export async function getUsers(): Promise<User[]> {
  try {
    const db = await User_DB.createDBConnection();
    const users = await db.all<User[]>("SELECT * FROM Users");
  
    await db.close();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}


