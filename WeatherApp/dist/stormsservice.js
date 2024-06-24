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
exports.createStormTable = exports.addStorm = exports.getStorm = void 0;
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
function addStorm(storm, discription) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDb();
        try {
            console.log("Storm: " + storm);
            yield db.run('INSERT INTO storms (storm, discription) VALUES (?, ?)', [storm, discription]);
            console.log('Inserted storms sucessfully');
        }
        catch (error) {
            console.error('Error inserting Storm:', error);
        }
        finally {
            yield db.close();
        }
    });
}
exports.addStorm = addStorm;
function createStormTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDb();
        yield db.exec(`
        CREATE TABLE IF NOT EXISTS storms (
        storm text,    
        discription text
        )
    `);
        yield db.close();
    });
}
exports.createStormTable = createStormTable;
function getStorm(storm) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDb();
        console.log("getCitys");
        try {
            const citys = yield db.all('SELECT discription FROM storms Where storm = ?', storm);
            console.log("discription: " + citys);
            return citys;
        }
        catch (error) {
            console.error('Error retrieving Storms:', error);
            return [];
        }
        finally {
            yield db.close();
        }
    });
}
exports.getStorm = getStorm;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        createStormTable();
        addStorm("Hurrikan", "Suchen Sie sofort Schutz in einem sicheren Gebäude. Vermeiden Sie Fenster und bleiben Sie im Inneren.");
        addStorm("Sturm", "Sichern Sie lose Gegenstände im Freien und bleiben Sie im Inneren, wenn möglich.");
        addStorm("Starkregen", "Vermeiden Sie überflutete Gebiete und suchen Sie höher gelegene Orte auf.");
        addStorm("Leichtes Unwetter", "Bleiben Sie informiert und halten Sie sich bereit für mögliche Änderungen der Wetterbedingungen.");
    });
}
main();
