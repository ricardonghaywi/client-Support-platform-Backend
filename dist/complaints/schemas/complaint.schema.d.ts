import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Status } from './status.enum';
export type ComplaintDocument = mongoose.HydratedDocument<Complaint>;
export declare class Complaint {
    title: string;
    body: string;
    status: string;
    enum: Status;
    createdDate: Date;
    creator: User;
}
export declare const ComplaintSchema: mongoose.Schema<Complaint, mongoose.Model<Complaint, any, any, any, any>, {}, {}, {}, {}, "type", Complaint>;
