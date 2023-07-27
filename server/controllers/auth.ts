import {Request, Response} from "express";
import User, {IUser} from "../models/user";

export type AuthenticatedRequest = Request & { user: IUser };

export const createOrUpdateUser = async (req: AuthenticatedRequest, res: Response) => {
    const {name, email, picture} = req.user;

    const user = await User.findOneAndUpdate(
        {email},
        {name, picture},
        {new: true},
    );
    if (user) {
        console.log('user updated', user)
        res.json(user);
    } else {
        const newUser = await new User({
            email,
            name,
            picture,
        }).save();
        console.log('user created', newUser)
    }
};
