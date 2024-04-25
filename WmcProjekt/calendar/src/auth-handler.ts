import { NextFunction } from "express";
import { Request, Response } from "express";
import jwt, {JwtPayload} from 'jsonwebtoken';
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

export interface AuthRequest extends Request {
    payload: JwtPayload;
}

export const isAuthenticated = (req: Request,res: Response, next:
    NextFunction) => {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');
            if (!token) {
                throw new Error("No bearer token available");
            }
            // check if the token is valid => otherwise an error is thrown
            //jwt.verify(token, SECRET_KEY);
            const decoded: string | JwtPayload = jwt.verify(token, SECRET_KEY!);
            (req as AuthRequest).payload = decoded as JwtPayload;
            next();
        } catch (err) {
            res.status(401).send(`Please authenticate! ${err}`);
        }
           
};

export const isAdmin = (req: Request,res: Response, next:
    NextFunction) => {
        try {
            // check if the jwt payload contains an admin role
            // TODO: How to access the jwt from the authentication middleware?
            const payload = (req as AuthRequest).payload;
            if (payload.user.role === "admin") {
                next();
            } else {
                res.status(401).send("Admin role required");
            }
        } catch (err) {
            // the request has not been authorized before
            res.status(401).send("Authentication required");
        } 
};