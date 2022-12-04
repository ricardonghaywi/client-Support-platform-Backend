import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './schemas/user.schema';


@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

    async create(firstName: string, lastName: string, email: string, password: string, isVip: boolean, role: string ){
        const user = new this.userModel({
            firstName, 
            lastName, 
            email, 
            password, 
            isVip, 
            role
        });

        const result = await user.save();
        return result;

    }


     async findByemail(Email: string) {

        const user =  this.userModel.findOne({email: Email});
        return user;
        

    }

    findall(){
       return this.userModel.find().exec();

       
    }




}
