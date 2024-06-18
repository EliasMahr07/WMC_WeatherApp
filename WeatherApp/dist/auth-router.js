"use strict";
/*
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { users } from './user-store';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isAuthenticated, isAdmin } from './auth-handler';

require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

export const authRouter = express.Router();
export interface UserCredentials {
    email: string;
    password: string;
}

authRouter.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
});

authRouter.get("/users", isAuthenticated, isAdmin, (request, response) => {
    response.status(StatusCodes.OK).json(users);
});

authRouter.post("/login", (request, response) => {
    const loginUser: UserCredentials = request.body;
    console.log(request.body)
    console.log(loginUser)
    const user = users.find((u) => u.email === loginUser.email);

    if (user === undefined) {
        response.status(StatusCodes.UNAUTHORIZED).json("User does not exist");
        return;
    }
    if (!bcrypt.compareSync(loginUser.password, user.password)) {
        response.status(StatusCodes.UNAUTHORIZED).json("Wrong password");
        return;
    }

    const userClaims = {
        email: user.email,
        role: user.role,
    };
    const expiresAt = new Date(Date.now() + 30 * 60000);
    const token = jwt.sign(
        {
            user: userClaims,
            exp: expiresAt.getTime() / 1000,
        },
        SECRET_KEY || '1234', // Use an empty string as the default value if SECRET_KEY is undefined
    );
});
*/ 
