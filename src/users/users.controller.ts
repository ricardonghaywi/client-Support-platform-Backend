import { Body, Controller,Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';



@Controller()
export class UsersController {
    constructor(private AuthService: AuthService) {}

    @Serialize(UserDto)
    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this.AuthService.Singup(body.firstName, body.lastName, body.email, body.password, body.isVip, body.isAdmin);

    }


}
