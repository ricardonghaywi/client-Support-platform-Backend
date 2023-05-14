import * as mongoose from 'mongoose';
export type UserDocument = mongoose.HydratedDocument<User>;
export declare class User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isVip: boolean;
    isAdmin: boolean;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, "type", User>;
