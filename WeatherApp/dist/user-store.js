"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.createUser = exports.User_DB = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_codes_1 = require("http-status-codes");
const saltRounds = 10;
// Define the path to the database file using an absolute path
const dbFileName = path_1.default.resolve(__dirname, "database.db");
// Ensure the directory exists
const dbDir = path_1.default.dirname(dbFileName);
if (!fs_1.default.existsSync(dbDir)) {
    fs_1.default.mkdirSync(dbDir, { recursive: true });
}
class User_DB {
    static createDBConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield (0, sqlite_1.open)({
                    filename: dbFileName,
                    driver: sqlite3_1.default.Database,
                });
                yield User_DB.ensureTablesCreated(db);
                return db;
            }
            catch (error) {
                console.error("Error creating database connection:", error);
                throw error;
            }
        });
    }
    static ensureTablesCreated(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection.run(`CREATE TABLE IF NOT EXISTS users (
            userid INTEGER PRIMARY KEY AUTOINCREMENT,
            username text,
            email Text,
            password Text,
            role Text,
            apikey Text
        )`);
            }
            catch (error) {
                console.error("Error ensuring tables creation:", error);
                throw error;
            }
        });
    }
}
exports.User_DB = User_DB;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        try {
            const db = yield User_DB.createDBConnection();
            const stmt = yield db.prepare("INSERT INTO Users (username, email, password, apikey, role) VALUES (?1, ?2, ?3, ?4, 5?)");
            yield stmt.bind({
                1: user.username,
                2: user.email,
                3: bcrypt_1.default.hashSync(user.password, saltRounds),
                4: user.apiKey,
                5: user.role
            });
            yield stmt.run();
            yield stmt.finalize();
            yield db.close();
            console.log(yield getUsers());
            res.status(http_status_codes_1.StatusCodes.OK).send("User created successfully");
        }
        catch (error) {
            console.error("Error creating user:", error);
            res.status(500).send("Internal Server Error");
        }
    });
}
exports.createUser = createUser;
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield User_DB.createDBConnection();
            const users = yield db.all("SELECT * FROM Users");
            yield db.close();
            return users;
        }
        catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    });
}
exports.getUsers = getUsers;
