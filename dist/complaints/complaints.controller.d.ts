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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dtos/create-complaint.dto';
import { UpdateComplaintDto } from './dtos/update-complaint.dto';
import { FilterComplaintsDto } from './dtos/filter-complaint.dto';
export declare class ComplaintsController {
    private ComplaintsService;
    constructor(ComplaintsService: ComplaintsService);
    createComplaint(req: any, body: CreateComplaintDto): Promise<import("mongoose").Document<unknown, any, import("./schemas/complaint.schema").Complaint> & import("./schemas/complaint.schema").Complaint & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getUserComplaints(req: any): Promise<(import("mongoose").Document<unknown, any, import("./schemas/complaint.schema").Complaint> & import("./schemas/complaint.schema").Complaint & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[] | "you have not issued any complaint !">;
    updateStatus(req: any, id: string, body: UpdateComplaintDto): Promise<any>;
    allComplaints(req: any, body: FilterComplaintsDto): Promise<any[] | "there are no complaints with the status you entered" | "there are no complaints!">;
}
