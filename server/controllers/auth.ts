import {Request, Response} from "express";
import User, {IUser} from "../models/user";

export type AuthenticatedRequest = Request & { user: IUser };

export const createOrUpdateUser = async (req: AuthenticatedRequest, res: Response) => {
    const {email, picture} = req.user;

    const user = await User.findOneAndUpdate(
        {email},
        {name: email.split("@")[0], picture},
        {new: true},
    );
    if (user) {
        res.json(user);
    } else {
        const newUser = await new User({
            email,
            name: email.split("@")[0],
            picture,
        }).save();
    }
};

export const currentUser = async (req: AuthenticatedRequest, res: Response) => {
    await User.findOne({email: req.user.email}).exec()
        .then((user) => {
            if (!user) {
                res.status(404).json({error: 'User not found'})
            } else {
                res.json(user);
            }
        })
        .catch((error) => {
            console.error('Error fetching user:', error);
            res.status(500).json({error: 'An error occurred while fetching the user'});
        })
}
