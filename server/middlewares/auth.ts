import {NextFunction, Request, Response} from "express";
import {IUser} from "../models/user";

const admin = require('../firebase');

type AuthenticatedRequest = Request & { user: IUser };

export const authCheck = async (req: AuthenticatedRequest , res: Response, next: NextFunction) => {
    try {
        const firebaseUser = await admin
            .auth()
            .verifyIdToken(req.headers.authtoken);
        console.log('FIRE BASE', firebaseUser);
        req.user = firebaseUser;
        next();
    } catch (error) {
        res.status(401).json({
            error: 'Invalid or expired token',
        });
    }
};
