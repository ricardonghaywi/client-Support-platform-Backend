import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './schemas/user.schema';


@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

    async create(firstName: string, lastName: string, email: string, password: string, isVip: boolean, isAdmin: boolean ){
        const user = new this.userModel({
            firstName, 
            lastName, 
            email, 
            password, 
            isVip, 
            isAdmin
        });

        const result = await user.save();
        return result;

    }


     async findByemail(Email: string) {

        const user =  this.userModel.findOne({email: Email});
        return user;
        

    }

    async findOne(id: string){

        const user =  await this.userModel.findById(id);
        return user;

       
    }




}

 



}
