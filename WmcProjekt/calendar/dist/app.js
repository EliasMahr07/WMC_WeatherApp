"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_store_1 = require("../data/user-store");
const auth_router_1 = require("./auth-router");
const auth_handler_1 = require("./auth-handler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Route
app.get('/', (req, res, next) => {
    if (false) {
        res.send('Hello, World!');
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
