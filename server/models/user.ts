import {Schema, Types} from 'mongoose';
import * as mongoose from "mongoose";


interface IUser extends Document {
    name: string,
    email: string,
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
        role: {
            type: String,
            default: 'subscriber',
        },
        cart: {
            type: Array,
            default: [],
        },
        address: String,
        wishlist: [{ type: Types.ObjectId, ref: 'Product' }],
    },
    { timestamps: true}
);

const User = mongoose.model('User', userSchema)

export default User;
