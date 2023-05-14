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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const complaints_service_1 = require("./complaints.service");
const create_complaint_dto_1 = require("./dtos/create-complaint.dto");
const update_complaint_dto_1 = require("./dtos/update-complaint.dto");
const filter_complaint_dto_1 = require("./dtos/filter-complaint.dto");
let ComplaintsController = class ComplaintsController {
    constructor(ComplaintsService) {
        this.ComplaintsService = ComplaintsService;
    }
    createComplaint(req, body) {
        return this.ComplaintsService.create(body.title, body.body, req.user.Id);
    }
    getUserComplaints(req) {
        return this.ComplaintsService.GetUserComplaints(req.user.Id);
    }
    updateStatus(req, id, body) {
        return this.ComplaintsService.updateStatus(id, body.status, req.user.Id);
    }
    allComplaints(req, body) {
        return this.ComplaintsService.getAll(body.status, req.user.Id);
    }
};
__decorate([
    (0, common_1.Post)('/New'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_complaint_dto_1.CreateComplaintDto]),
    __metadata("design:returntype", void 0)
], ComplaintsController.prototype, "createComplaint", null);
__decorate([
    (0, common_1.Get)('/User'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ComplaintsController.prototype, "getUserComplaints", null);
__decorate([
    (0, common_1.Patch)('/update/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_complaint_dto_1.UpdateComplaintDto]),
    __metadata("design:returntype", void 0)
], ComplaintsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)('/all'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filter_complaint_dto_1.FilterComplaintsDto]),
    __metadata("design:returntype", void 0)
], ComplaintsController.prototype, "allComplaints", null);
ComplaintsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('complaints'),
    __metadata("design:paramtypes", [complaints_service_1.ComplaintsService])
], ComplaintsController);
exports.ComplaintsController = ComplaintsController;
//# sourceMappingURL=complaints.controller.js.map