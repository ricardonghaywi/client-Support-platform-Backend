"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintSchema = exports.Complaint = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_schema_1 = require("../../users/schemas/user.schema");
const status_enum_1 = require("./status.enum");
let Complaint = class Complaint {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Complaint.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Complaint.prototype, "body", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: status_enum_1.Status.PENDING }),
    __metadata("design:type", String)
], Complaint.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Complaint.prototype, "createdDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], Complaint.prototype, "creator", void 0);
Complaint = __decorate([
    (0, mongoose_1.Schema)()
], Complaint);
exports.Complaint = Complaint;
exports.ComplaintSchema = mongoose_1.SchemaFactory.createForClass(Complaint);
exports.ComplaintSchema.index({ creator: 1 });
exports.ComplaintSchema.index({ createdDate: -1, status: 1 });
//# sourceMappingURL=complaint.schema.js.map