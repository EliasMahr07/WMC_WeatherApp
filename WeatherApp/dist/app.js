"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_store_1 = require("./user-store");
const auth_router_1 = require("./auth-router");
const auth_handler_1 = require("./auth-handler");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
__dirname = path_1.default.resolve();
const rootDir = path_1.default.join(__dirname, "./public");
app.use(express_1.default.json());
app.use('../assets', express_1.default.static(path_1.default.join(__dirname, 'assets')));
// Route
app.get('/', (req, res, next) => {
    if (true) {
        res.sendFile('login.html', { root: rootDir });
        console.log("test");
    }
    else {
        next();
    }
});
app.get('/admin', auth_handler_1.isAuthenticated, auth_handler_1.isAdmin, (req, res, next) => {
    res.send('Hello, Admin!');
});
app.use(express_1.default.static('public'));
// Verbinde den Router mit deiner Express-App
app.use('/api/auth', auth_router_1.authRouter);
// Starte den Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
console.log(user_store_1.users);
