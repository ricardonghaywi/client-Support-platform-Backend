import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
        ) {}

    async Singup(firstName: string, lastname: string, email: string, password: string, isVip: boolean, isAdmin: boolean){
        const user = await this.usersService.findByemail(email);

        if (user) {

            throw new BadRequestException('email already in use');
        }

        const Rounds = 10;
        const hashedPw = await bcrypt.hash(password, Rounds);

        const NewUser = await this.usersService.create(firstName, lastname, email,  hashedPw, isVip, isAdmin);
        return NewUser;
}

async validateUser(email: string, password: string): Promise<any> {

    const user = await this.usersService.findByemail(email);

    if (!user) {
        throw new NotFoundException('user with this email does not exist');
    }

    

    const Match = await bcrypt.compare(password, user.password);

    if (!Match) {
        throw new BadRequestException('wrong password');

    }
    
    return user;

}

async login(user: any) {
    const payload = { sub: user._id };

    return {
        access_token: this.jwtService.sign(payload),
    };
}


}
