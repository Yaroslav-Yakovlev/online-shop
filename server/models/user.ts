import { Document, Schema, Types } from 'mongoose';
import * as mongoose from "mongoose";


export interface IUser extends Document {
    name: string,
    email: string,
    picture?: string,
    role?: string,
    cart: any[],
    address: string,
    wishlist: Types.ObjectId[],
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: String,
        email: {
            type: String,
            require: true,
            index: true,
        },
        picture: String,
        role: {
            type: String,
            default: 'subscriber',
        },
        cart: {
            type: Schema.Types.Mixed,
            default: [],
        },
        address: String,
        wishlist: [{ type: Types.ObjectId, ref: 'Product' }],
    },
    { timestamps: true}
);

export const User = mongoose.model('User', userSchema)

export default User;
