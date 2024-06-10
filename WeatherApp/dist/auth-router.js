"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express_1 = require("express");
var http_status_codes_1 = require("http-status-codes");
var __user_store_ts_1 = require("..user-store.ts");
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_handler_1 = require("../src/auth-handler");
require('dotenv').config();
var SECRET_KEY = process.env.SECRET_KEY;
exports.authRouter = express_1.default.Router();
exports.authRouter.use(function (req, res, next) {
    console.log('Request URL:', req.originalUrl);
    next();
});
exports.authRouter.get("/users", auth_handler_1.isAuthenticated, auth_handler_1.isAdmin, function (request, response) {
    response.status(http_status_codes_1.StatusCodes.OK).json(__user_store_ts_1.users);
});
exports.authRouter.post("/login", function (request, response) {
    var loginUser = request.body;
    console.log(request.body);
    console.log(loginUser);
    var user = __user_store_ts_1.users.find(function (u) { return u.email === loginUser.email; });
    if (user === undefined) {
        response.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json("User does not exist");
        return;
    }
    if (!bcrypt_1.default.compareSync(loginUser.password, user.password)) {
        response.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json("Wrong password");
        return;
    }
    var userClaims = {
        email: user.email,
        role: user.role,
    };
    var minutes = 90;
    var expiresAt = new Date(Date.now() + minutes * 60000);
    var token = jsonwebtoken_1.default.sign({
        user: userClaims,
        exp: expiresAt.getTime() / 1000,
    }, SECRET_KEY);
    response.status(http_status_codes_1.StatusCodes.OK).json({
        userClaims: userClaims,
        expiresAt: expiresAt.getTime(),
        accessToken: token,
    });
});
#;
