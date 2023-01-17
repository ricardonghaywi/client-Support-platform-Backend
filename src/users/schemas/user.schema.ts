import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';


export type UserDocument = mongoose.HydratedDocument<User>;

@Schema()

export class User {

    @Prop({required: true})
    firstName: string;

    @Prop({required: true})
    lastName: string;

    @Prop({required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({default: false})
    isVip: boolean;

    @Prop({default: false})
    isAdmin: boolean;

}


export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({email: 1});
