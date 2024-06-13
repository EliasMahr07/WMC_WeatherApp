"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = exports.dbName = void 0;
const sqlite3_1 = require("sqlite3");
const sqlite_1 = require("sqlite");
const path = __importStar(require("path"));
exports.dbName = "data.db";
class DB {
    static createDBConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, sqlite_1.open)({
                filename: path.resolve(__dirname, exports.dbName),
                driver: sqlite3_1.Database
            });
            yield DB.ensureTableCreated(db);
            yield DB.populateInitialData(db);
            return db;
        });
    }
    static ensureTableCreated(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection.run(`CREATE TABLE IF NOT EXISTS data (
                location TEXT,
                month TEXT,
                value INTEGER
            )`);
            console.log("Erstellt");
        });
    }
    static populateInitialData(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield connection.get("SELECT COUNT(*) as count FROM data");
            if (row.count === 0) {
                const kitchenData = [10, 15, 3];
                const livingroomData = [5, 8, 3];
                const loc = ['Kitchen', 'Livingroom'];
                const monthLabels = ['Jan', 'Feb', 'März'];
                const insertStatement = `INSERT INTO data (location, month, value) VALUES (?, ?, ?)`;
                for (const location of loc) {
                    const data = location === 'Kitchen' ? kitchenData : livingroomData;
                    for (let i = 0; i < data.length; i++) {
                        yield connection.run(insertStatement, [location, monthLabels[i], data[i]]);
                    }
                }
            }
        });
    }
    static getData() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield DB.createDBConnection();
            const rows = yield db.all("SELECT location, month, value FROM data");
            const data = {};
            rows.forEach((row) => {
                if (!data[row.location]) {
                    data[row.location] = {};
                }
                data[row.location][row.month] = row.value;
            });
            return data;
        });
    }
}
exports.DB = DB;
