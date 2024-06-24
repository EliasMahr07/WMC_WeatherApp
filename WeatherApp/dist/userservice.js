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
exports.changeRole = exports.changePwd = exports.deleteUser = exports.login = exports.createUserTable = exports.addUser = exports.getUsers = exports.createUser = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dbFilename = "database.db";
const crypto_1 = __importDefault(require("crypto"));
const http_status_codes_1 = require("http-status-codes");
function openDb() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, sqlite_1.open)({
            filename: dbFilename,
            driver: sqlite3_1.default.Database
        });
    });
}
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        try {
            const db = yield openDb();
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
function addUser(username, email, password, role) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("=================ADD=USER=================");
        const db = yield openDb();
        try {
            if ((yield doesUserExists(username)) == false) {
                console.log("Username: " + username + "does not exists");
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                console.log("normal: " + password + " hash: " + hashedPassword);
                const apiKey = generateApiKey();
                yield db.run('INSERT INTO users (username, email, password, apikey, role) VALUES (?, ?, ?, ?, ?)', [username, email, hashedPassword, apiKey, role]);
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
exports.addUser = addUser;
function deleteUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("=================DELETE=USER=================");
        const db = yield openDb();
        const result = yield db.run('DELETE FROM users where username = ?', username);
        yield db.close();
        if (result.changes != 0) {
            console.log(`User ${username} deleted successfully`);
        }
        else {
            console.log(`User ${username} not found`);
        }
    });
}
exports.deleteUser = deleteUser;
function changeRole(username, role) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("=================CHANGE=ROLE=================");
        if (role.toLowerCase() == "admin" || role.toLowerCase() == "client") {
            const db = yield openDb();
            const result = yield db.run('UPDATE users SET role = ? WHERE username = ?', role, username);
            yield db.close();
            if (result.changes === 0) {
                console.log(`User ${username} role not changed`);
            }
            else {
                console.log(`User ${username} changed role to ${role}`);
            }
            return;
        }
        console.log("no valid role: " + role);
    });
}
exports.changeRole = changeRole;
function generateApiKey() {
    return crypto_1.default.randomBytes(10).toString('hex'); // Erzeugt einen 64-stelligen Hex-String
}
function changePwd(username, newPwd) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("=================CHANGE=PASSWORD=================");
        const db = yield openDb();
        const hashedPwd = yield bcrypt_1.default.hash(newPwd, 10); // Passwort hashen
        const result = yield db.run('UPDATE users SET password = ? WHERE username = ?', hashedPwd, username);
        yield db.close();
        if (result.changes === 0) {
            console.log(`User ${username} not found`);
        }
        else {
            console.log(`User ${username} changed pwd to ${newPwd}`);
        }
    });
}
exports.changePwd = changePwd;
function login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("=================LOGIN=================");
        const db = yield openDb();
        const user = yield db.get('SELECT password FROM users WHERE username = ?', username);
        yield db.close();
        console.log("User LOGIN: " + user);
        console.log("User pwd: " + user.password);
        if (user) {
            const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
            console.log("is password correct: " + isPasswordCorrect);
            return true;
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
        try {
            const db = yield openDb();
            const users = yield db.all("SELECT * FROM User");
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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let tmp = getUsers();
        console.log(tmp);
    });
}
main();
