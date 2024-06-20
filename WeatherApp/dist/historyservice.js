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
exports.createHistroyTable = exports.addHistroy = exports.getHistroy = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const dbFilename = "database.db";
function openDb() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, sqlite_1.open)({
            filename: dbFilename,
            driver: sqlite3_1.default.Database
        });
    });
}
function addHistroy(userid, weatherid) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDb();
        try {
            if (yield doesUserIdExists(userid)) {
                yield db.run('INSERT INTO histroy (weatherid, userid) VALUES (?, ?)', [weatherid, userid]);
                console.log('Inserted user sucessfully');
            }
        }
        catch (error) {
            console.error('Error inserting weather data:', error);
        }
        yield db.close();
    });
}
exports.addHistroy = addHistroy;
function doesUserIdExists(userid) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDb();
        let result;
        try {
            result = yield db.get('SELECT 1 FROM users WHERE userid = ?', userid);
        }
        catch (error) {
            console.error('Error getting users', error);
        }
        yield db.close();
        return !!result;
    });
}
function createHistroyTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDb();
        yield db.exec(`
        CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            weatherid INTEGER,
            userid INTEgER
        )
    `);
        yield db.close();
    });
}
exports.createHistroyTable = createHistroyTable;
function getHistroy() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDb();
        try {
            const users = yield db.all('SELECT * FROM history');
            return users;
        }
        catch (error) {
            console.error('Error retrieving the history:', error);
            return [];
        }
        finally {
            yield db.close();
        }
    });
}
exports.getHistroy = getHistroy;
