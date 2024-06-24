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
exports.createCitysTable = exports.addCity = exports.getCitys = void 0;
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
function addCity(userId, city) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDb();
        try {
            console.log("City: " + city);
            yield db.run('INSERT INTO citys (city) VALUES (?, ?)', [userId, city]);
            console.log('Inserted city sucessfully');
        }
        catch (error) {
            console.error('Error inserting City:', error);
        }
        finally {
            yield db.close();
        }
    });
}
exports.addCity = addCity;
function createCitysTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDb();
        yield db.exec(`
        CREATE TABLE IF NOT EXISTS citys (
        userId integer,    
        city text
        )
    `);
        yield db.close();
    });
}
exports.createCitysTable = createCitysTable;
function getCitys(userId2) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDb();
        console.log("getCitys");
        try {
            const citys = yield db.all('SELECT * FROM citys Where userId = ?', userId2);
            console.log("citys: " + citys);
            return citys;
        }
        catch (error) {
            console.error('Error retrieving Citys:', error);
            return [];
        }
        finally {
            yield db.close();
        }
    });
}
exports.getCitys = getCitys;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        addCity(1, "Wien");
        console.log(yield getCitys(1));
    });
}
main();
