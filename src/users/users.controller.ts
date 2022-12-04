import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from '../auth/auth.service';



@Controller()
export class UsersController {
    constructor(private AuthService: AuthService) {}


    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this.AuthService.Singup(body.firstName, body.lastName, body.email, body.password, body.isVip, body.isAdmin);

    }


}
