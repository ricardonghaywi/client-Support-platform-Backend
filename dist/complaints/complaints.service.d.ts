/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { ComplaintDocument } from './schemas/complaint.schema';
import { UsersService } from 'src/users/users.service';
export declare class ComplaintsService {
    private complaintModel;
    private UsersService;
    constructor(complaintModel: Model<ComplaintDocument>, UsersService: UsersService);
    create(title: string, body: string, creator: string): Promise<import("mongoose").Document<unknown, any, import("./schemas/complaint.schema").Complaint> & import("./schemas/complaint.schema").Complaint & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateStatus(id: string, status: string, userId: string): Promise<any>;
    GetUserComplaints(userid: string): Promise<(import("mongoose").Document<unknown, any, import("./schemas/complaint.schema").Complaint> & import("./schemas/complaint.schema").Complaint & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[] | "you have not issued any complaint !">;
    getAll(filterBystatus: string, UserId: string): Promise<any[] | "there are no complaints with the status you entered" | "there are no complaints!">;
}
