import {NextFunction, Request, Response} from "express";
import {IUser, User} from "../models/user";


const admin = require('../firebase/index');


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

export const adminCheck = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const email = req.user.email;

    const adminUser = await User.findOne({email}).exec();

    if (!adminUser) {
        res.status(403).json({
            error: 'User not found',
        })
    } else if (adminUser.role !== 'admin') {
        res.status(403).json({
            error: 'Admin resource. Access denied',
        });
    } else {
        next();
    }
};
