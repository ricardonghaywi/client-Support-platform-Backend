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
exports.ComplaintsService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const users_service_1 = require("../users/users.service");
let ComplaintsService = class ComplaintsService {
    constructor(complaintModel, UsersService) {
        this.complaintModel = complaintModel;
        this.UsersService = UsersService;
    }
    async create(title, body, creator) {
        const user = await this.UsersService.findOne(creator);
        if (!user) {
            throw new common_1.NotFoundException;
        }
        if (user.isAdmin) {
            throw new common_1.UnauthorizedException('only users can access this route');
        }
        const Newcomplaint = new this.complaintModel({
            title,
            body,
            creator,
        });
        const result = await Newcomplaint.save();
        return result;
    }
    async updateStatus(id, status, userId) {
        const user = await this.UsersService.findOne(userId);
        if (!user) {
            throw new common_1.NotFoundException;
        }
        if (!user.isAdmin) {
            throw new common_1.UnauthorizedException('only admins can access this route');
        }
        let complaint;
        try {
            complaint = await this.complaintModel.findById(id);
        }
        catch (error) {
            throw new common_1.NotFoundException('invalid id');
        }
        if (!complaint) {
            throw new common_1.NotFoundException('Could not find complaint!');
        }
        complaint.status = status;
        complaint.save();
        return complaint;
    }
    async GetUserComplaints(userid) {
        const user = await this.UsersService.findOne(userid);
        if (!user) {
            throw new common_1.NotFoundException;
        }
        if (user.isAdmin) {
            throw new common_1.UnauthorizedException('only users can access this route');
        }
        const complaints = await this.complaintModel.find({ creator: userid });
        if (complaints.length === 0) {
            return ('you have not issued any complaint !');
        }
        return complaints;
    }
    async getAll(filterBystatus, UserId) {
        const user = await this.UsersService.findOne(UserId);
        if (!user) {
            throw new common_1.NotFoundException;
        }
        if (!user.isAdmin) {
            throw new common_1.UnauthorizedException('only admins can access this route');
        }
        let pipeline = [];
        if (filterBystatus) {
            pipeline.push({
                $match: {
                    status: filterBystatus
                }
            });
        }
        pipeline.push({
            $project: {
                _id: 0,
                __v: 0
            }
        }, {
            $sort: {
                createdDate: -1
            }
        }, {
            $lookup: {
                from: 'users',
                localField: 'creator',
                foreignField: '_id',
                as: 'User'
            }
        });
        pipeline.push({
            $project: {
                creator: 0,
                'User._id': 0,
                'User.__v': 0,
                'User.password': 0,
                'User.isAdmin': 0
            }
        }, {
            $unwind: '$User'
        }, {
            $group: {
                _id: null,
                Vip: {
                    $push: {
                        $cond: [{ $eq: ['$User.isVip', true] },
                            '$$ROOT',
                            '$$REMOVE'
                        ]
                    }
                },
                nonVip: {
                    $push: {
                        $cond: [{ $eq: ['$User.isVip', false] },
                            '$$ROOT',
                            '$$REMOVE'
                        ]
                    }
                }
            },
        });
        pipeline.push({
            $project: {
                _id: 0,
                'Vip.User.isVip': 0,
                'nonVip.User.isVip': 0,
            }
        });
        const complaints = await this.complaintModel.aggregate(pipeline);
        if (complaints.length === 0 && filterBystatus) {
            return ('there are no complaints with the status you entered');
        }
        if (complaints.length === 0 && (!filterBystatus)) {
            return ('there are no complaints!');
        }
        return complaints;
    }
};
ComplaintsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Complaint')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        users_service_1.UsersService])
], ComplaintsService);
exports.ComplaintsService = ComplaintsService;
//# sourceMappingURL=complaints.service.js.map