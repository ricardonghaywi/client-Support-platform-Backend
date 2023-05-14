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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async Singup(firstName, lastname, email, password, isVip, isAdmin) {
        const user = await this.usersService.findByemail(email);
        if (user) {
            throw new common_1.BadRequestException('email already in use');
        }
        const Rounds = 10;
        const hashedPw = await bcrypt.hash(password, Rounds);
        const NewUser = await this.usersService.create(firstName, lastname, email, hashedPw, isVip, isAdmin);
        return NewUser;
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByemail(email);
        if (!user) {
            throw new common_1.NotFoundException('user with this email does not exist');
        }
        const Match = await bcrypt.compare(password, user.password);
        if (!Match) {
            throw new common_1.BadRequestException('wrong password');
        }
        return user;
    }
    async login(user) {
        const payload = { sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map