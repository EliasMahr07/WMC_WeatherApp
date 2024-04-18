import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { users } from '../data/user-store';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'my_secret';

export const authRouter = express.Router();
export interface UserCredentials {
    email: string;
    password: string;
}

authRouter.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
});

authRouter.get("/users", (request, response) => {
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
    const minutes = 15;
    const expiresAt = new Date(Date.now() + minutes * 60000);
    const token = jwt.sign(
        {
            user: userClaims,
            exp: expiresAt.getTime() / 1000,
        },
        SECRET_KEY
    );


    response.status(StatusCodes.OK).json({
        userClaims: userClaims,
        expiresAt: expiresAt.getTime(),
        accessToken: token,
    });
});



