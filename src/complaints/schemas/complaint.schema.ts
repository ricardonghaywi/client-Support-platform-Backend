import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Status } from './status.enum';


export type ComplaintDocument = mongoose.HydratedDocument<Complaint>;

@Schema()

export class Complaint {

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    body: string;

    @Prop({required: true, default: Status.PENDING})
    status: string;
    enum: Status;


    @Prop({default: Date.now})
    createdDate: Date;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    creator: User;


}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);