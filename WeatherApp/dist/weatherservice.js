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
exports.deleteAllData = exports.createDatabase = exports.getWeatherData = exports.addWeatherData = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
/*
const deleteButton = document.getElementById('deleteButton');
if (deleteButton) {
    deleteButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/delete-all-data', {
                method: 'POST',
            });
            const result = await response.json();
            if (result.success) {
                alert('Deleted all weather data successfully.');
            } else {
                alert('Failed to delete weather data.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while deleting weather data.');
        }
    });
} else {
    console.error('Button with ID "deleteButton" not found.');
}
*/
function addWeatherData(date, temperature, humidity, room) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, sqlite_1.open)({
            filename: 'database.db',
            driver: sqlite3_1.default.Database
        });
        try {
            yield db.run('INSERT INTO weather (date, temperature, humidity, room) VALUES (?, ?, ?, ?)', [date, temperature, humidity, room]);
            console.log('Inserted weather data successfully.');
        }
        catch (error) {
            console.error('Error inserting weather data:', error);
        }
        finally {
            yield db.close();
        }
    });
}
exports.addWeatherData = addWeatherData;
function deleteAllData() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, sqlite_1.open)({
            filename: 'database.db',
            driver: sqlite3_1.default.Database
        });
        try {
            yield db.run('DELETE FROM weather');
            console.log('Deleted all weather data successfully.');
        }
        catch (error) {
            console.error('Error deleting weather data:', error);
        }
        finally {
            yield db.close();
        }
    });
}
exports.deleteAllData = deleteAllData;
function createDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, sqlite_1.open)({
            filename: 'database.db',
            driver: sqlite3_1.default.Database
        });
        yield db.exec(`
        CREATE TABLE IF NOT EXISTS weather (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date DATETIME,
            temperature REAL,
            humidity REAL,
            room TEXT
        )
    `);
        yield db.close();
    });
}
exports.createDatabase = createDatabase;
function getWeatherData() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, sqlite_1.open)({
            filename: 'database.db',
            driver: sqlite3_1.default.Database
        });
        try {
            const weatherData = yield db.all('SELECT * FROM weather');
            return weatherData;
        }
        catch (error) {
            console.error('Error retrieving weather data:', error);
            return [];
        }
        finally {
            yield db.close();
        }
    });
}
exports.getWeatherData = getWeatherData;
