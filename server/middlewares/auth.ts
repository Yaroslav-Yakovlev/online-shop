import {Request, Response} from "express";

const admin = require('../firebase');

export const authCheck = (req: Request, res: Response, next: any) => {
    console.log(req.headers); // token
    next();
};
