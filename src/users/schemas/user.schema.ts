import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Complaint } from 'src/complaints/schemas//complaint.schema';
import { Role } from './role.enum';


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

    @Prop({default: Role.USER})
    role: string;
    enum: Role

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' }] })
    complaints: Complaint[]
}


export const UserSchema = SchemaFactory.createForClass(User);