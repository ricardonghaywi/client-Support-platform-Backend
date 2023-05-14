"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const complaints_service_1 = require("./complaints.service");
const complaints_controller_1 = require("./complaints.controller");
const complaint_schema_1 = require("./schemas/complaint.schema");
const users_module_1 = require("../users/users.module");
let ComplaintsModule = class ComplaintsModule {
};
ComplaintsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Complaint', schema: complaint_schema_1.ComplaintSchema }]),
            users_module_1.UsersModule],
        providers: [complaints_service_1.ComplaintsService],
        controllers: [complaints_controller_1.ComplaintsController]
    })
], ComplaintsModule);
exports.ComplaintsModule = ComplaintsModule;
//# sourceMappingURL=complaints.module.js.map