import {Request, Response} from "express";

export const createOrUpdateUser = (req: Request, res: Response) => {
    res.json({
        data: 'hey you hit create-or-update-user API endpoint',
    });
}
