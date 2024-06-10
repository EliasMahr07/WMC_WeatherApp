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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite3_1 = require("sqlite3");
var sqlite_1 = require("sqlite");
var database_1 = require("./database");
var express_1 = require("express");
function connectDB() {
    return __awaiter(this, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, sqlite_1.open)({
                        filename: './users.db',
                        driver: sqlite3_1.default.Database
                    })];
                case 1:
                    db = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function insertUser(id, name, age) {
    return __awaiter(this, void 0, void 0, function () {
        var db, statment, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    db = database_1.DB.createDBConnection();
                    return [4 /*yield*/, db];
                case 1:
                    statment = (_b.sent()).prepare('INSERT INTO USERS (id,name,age) VALUES (?1,?2,?3)');
                    return [4 /*yield*/, statment];
                case 2:
                    (_b.sent()).bind({ 1: id }, { 2: name }, { 3: age });
                    return [4 /*yield*/, statment];
                case 3:
                    (_b.sent()).run();
                    return [4 /*yield*/, statment];
                case 4:
                    (_b.sent()).finalize();
                    return [4 /*yield*/, db];
                case 5:
                    (_b.sent()).close;
                    return [2 /*return*/, true];
                case 6:
                    _a = _b.sent();
                    return [2 /*return*/, false];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function () {
        var db, statement, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    db = database_1.DB.createDBConnection();
                    return [4 /*yield*/, db];
                case 1:
                    statement = (_b.sent()).prepare('DELETE FROM users WHERE id = ?1');
                    return [4 /*yield*/, statement];
                case 2:
                    (_b.sent()).bind({ 1: id });
                    return [4 /*yield*/, statement];
                case 3:
                    (_b.sent()).run();
                    return [4 /*yield*/, statement];
                case 4:
                    (_b.sent()).finalize();
                    return [4 /*yield*/, db];
                case 5:
                    (_b.sent()).close;
                    return [2 /*return*/, true];
                case 6:
                    _a = _b.sent();
                    return [2 /*return*/, false];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            database_1.DB.createDBConnection();
            insertUser(1, "Tim", 16);
            insertUser(2, "Mo", 17);
            deleteUser(2);
            return [2 /*return*/];
        });
    });
}
connectDB();
main();
var auth_router_1 = require("../src/auth-router");
var auth_handler_1 = require("../src/auth-handler");
var path_1 = require("path");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('../assets', express_1.default.static(path_1.default.join(__dirname, 'assets')));
// Route
app.get('/', function (req, res, next) {
    if (false) {
        res.send('Hello, World!');
    }
    else {
        next();
    }
});
app.get('/admin', auth_handler_1.isAuthenticated, auth_handler_1.isAdmin, function (req, res, next) {
    res.send('Hello, Admin!');
});
app.use(express_1.default.static('public'));
// Verbinde den Router mit deiner Express-App
app.use('/api/auth', auth_router_1.authRouter);
// Starte den Server
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server l\u00E4uft auf Port ".concat(port));
});
