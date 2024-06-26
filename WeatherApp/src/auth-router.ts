import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { getUsers } from "./user-store";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isAuthenticated, isAdmin } from './auth-handler';
import { login} from './userservice'

require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

export const authRouter = express.Router();
export interface UserCredentials {
    email: string;
    password: string;
    username: string;
}

authRouter.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
});

authRouter.get("/users", isAuthenticated, isAdmin, (request, response) => {
    response.status(StatusCodes.OK).json(getUsers());
});

authRouter.post("/login", (request, response) => {
    const loginUser: UserCredentials = request.body;
    console.log(request.body)
    console.log(loginUser)
    //const user = getUsers.find((u) => u.email === loginUser.email);
    const logedIn =  login(loginUser.username, loginUser.password);

    logedIn.then((isLoggedIn) => {
        if (isLoggedIn) {
            
        } else {
            
        }
      }).catch((error) => {
        console.error("Error occurred while checking login status:", error);
      });

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
        password: user.password
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
