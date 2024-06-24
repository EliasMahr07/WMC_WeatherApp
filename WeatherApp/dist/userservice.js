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
exports.login = exports.createUserTable = exports.addUsers = exports.getUsers = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dbFilename = "database.db";
function openDb() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, sqlite_1.open)({
            filename: dbFilename,
            driver: sqlite3_1.default.Database
        });
    });
}
function addUsers(username, email, password, apikey, role) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDb();
        try {
            if ((yield doesUserExists(username)) == false) {
                console.log("Username: " + username + "does not exists");
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                console.log("normal: " + password + " hash: " + hashedPassword);
                yield db.run('INSERT INTO users (username, email, password, apikey, role) VALUES (?, ?, ?, ?, ?)', [username, email, hashedPassword, apikey, role]);
                console.log('Inserted user sucessfully');
            }
            else {
                console.log('User already exists' + username);
            }
        }
        catch (error) {
            console.error('Error inserting weather data:', error);
        }
        finally {
            yield db.close();
        }
    });
}
exports.addUsers = addUsers;
function login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDb();
        const user = yield db.get('SELECT password FROM users WHERE username = ?', username);
        yield db.close();
        console.log("User LOGIN: " + user);
        console.log("User pwd: " + user.password);
        if (user) {
            const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
            console.log("is password correct: " + isPasswordCorrect);
        }
        else {
            console.log("password is incorrect");
            return false;
        }
    });
}
exports.login = login;
function doesUserExists(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDb();
        let result;
        try {
            result = yield db.get('SELECT * FROM users WHERE username = ?', username);
            console.log("result does username exist: " + result);
        }
        catch (error) {
            console.log('Error getting users', error);
        }
        yield db.close();
        if (result == undefined) {
            console.log("return DoesUser exist: false");
            return false;
        }
        console.log("return DoesUser exist: true");
        return true;
    });
}
function createUserTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDb();
        yield db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            userid INTEGER PRIMARY KEY AUTOINCREMENT,
            username text,
            email Text,
            password Text,
            role Text,
            apikey Text
        )
    `);
        yield db.close();
    });
}
exports.createUserTable = createUserTable;
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDb();
        console.log("getUsers");
        let tmp = "";
        try {
            const users = yield db.all('SELECT * FROM users');
            users.forEach(user => {
                tmp = user.username + " " + user.email + " " + user.password + " " + user.role + " " + user.apikey;
            });
            console.log("users: " + users);
            return users;
        }
        catch (error) {
            console.error('Error retrieving users:', error);
            return [];
        }
        finally {
            yield db.close();
        }
    });
}
exports.getUsers = getUsers;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let tmp = getUsers();
        console.log(tmp);
    });
}
main();
