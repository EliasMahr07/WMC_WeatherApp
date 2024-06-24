"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const user_store_1 = require("./user-store");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_handler_1 = require("./auth-handler");
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
exports.authRouter = express_1.default.Router();
exports.authRouter.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
});
exports.authRouter.get("/users", auth_handler_1.isAuthenticated, auth_handler_1.isAdmin, (request, response) => {
    response.status(http_status_codes_1.StatusCodes.OK).json((0, user_store_1.getUsers)());
});
exports.authRouter.post("/login", (request, response) => {
    const loginUser = request.body;
    console.log(request.body);
    console.log(loginUser);
    const user = user_store_1.getUsers.find((u) => u.email === loginUser.email);
    if (user === undefined) {
        response.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json("User does not exist");
        return;
    }
    if (!bcrypt_1.default.compareSync(loginUser.password, user.password)) {
        response.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json("Wrong password");
        return;
    }
    const userClaims = {
        email: user.email,
        role: user.role,
        password: user.password
    };
    const expiresAt = new Date(Date.now() + 30 * 60000);
    const token = jsonwebtoken_1.default.sign({
        user: userClaims,
        exp: expiresAt.getTime() / 1000,
    }, SECRET_KEY || '1234');
});
