"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
const isAuthenticated = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            throw new Error("No bearer token available");
        }
        // check if the token is valid => otherwise an error is thrown
        //jwt.verify(token, SECRET_KEY);
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.payload = decoded;
        next();
    }
    catch (err) {
        res.status(401).send(`Please authenticate! ${err}`);
    }
};
exports.isAuthenticated = isAuthenticated;
const isAdmin = (req, res, next) => {
    try {
        // check if the jwt payload contains an admin role
        // TODO: How to access the jwt from the authentication middleware?
        const payload = req.payload;
        if (payload.user.role === "admin") {
            next();
        }
        else {
            res.status(401).send("Admin role required");
        }
    }
    catch (err) {
        // the request has not been authorized before
        res.status(401).send("Authentication required");
    }
};
exports.isAdmin = isAdmin;
