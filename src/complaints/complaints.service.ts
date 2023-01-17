import { Model } from 'mongoose';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ComplaintDocument } from './schemas/complaint.schema';
import { UsersService } from 'src/users/users.service';



@Injectable()
export class ComplaintsService {

    constructor(@InjectModel('Complaint') private complaintModel: Model<ComplaintDocument>,
    private UsersService: UsersService) {}


    async create(title: string, body: string, creator: string ){

        const user =  await this.UsersService.findOne(creator);

        if (!user) {
            throw new NotFoundException;

        }
        if(user.isAdmin){
            throw new UnauthorizedException('only users can access this route');
        }

        const Newcomplaint = new this.complaintModel({
            title,
            body,
            creator,
        
        });

        const result = await Newcomplaint.save();
        return result;

    }



    async updateStatus(id: string, status: string, userId: string){
        const user = await this.UsersService.findOne(userId);
        if(!user) {
            throw new NotFoundException;
        }

        if(!user.isAdmin) {
            throw new UnauthorizedException('only admins can access this route');
        }

        let complaint;

        try {

         complaint = await this.complaintModel.findById(id);
        }
        catch(error) {
            throw new NotFoundException('invalid id');
        }

        if(!complaint) {
            throw new NotFoundException('Could not find complaint!');
        }

        complaint.status = status;

        complaint.save();
        return complaint;

}


    async GetUserComplaints(userid: string) {

        const user = await this.UsersService.findOne(userid);
        if(!user) {
            throw new NotFoundException;
        }
        if(user.isAdmin) {

            throw new UnauthorizedException('only users can access this route');
        }

        const complaints = await this.complaintModel.find({creator: userid});

        if ( complaints.length === 0 ){
            
            return('you have not issued any complaint !');
        
        }

            return complaints;
 }



    async getAll(filterBystatus: string, UserId: string){

        const user = await this.UsersService.findOne(UserId);
        if(!user) {
            throw new NotFoundException;
        }

        if (!user.isAdmin) {
            throw new UnauthorizedException('only admins can access this route');
        }


        let pipeline = [];

        if (filterBystatus){

            pipeline.push({

                
                    $match:{
                        status: filterBystatus
                    }
                
            },
            );

        }

        pipeline.push(
            
        {
            $project: {

                _id:0,
                __v:0
            }
        },


        {

            $sort:{
                createdDate: -1
            }

        },

        {

            $lookup: {
                from: 'users',
                localField: 'creator',
                foreignField: '_id',
                as: 'User'
            }

        },

);


 pipeline.push(

    {

    $project:{
        creator: 0,
        'User._id':0,
        'User.__v': 0,
        'User.password':0,
        'User.isAdmin':0

    }
},

{
    $unwind:'$User'
},

{
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

},
    
);

 pipeline.push({
    
    $project: {
         
        _id: 0,
        'Vip.User.isVip': 0,
        'nonVip.User.isVip': 0,

    }
}
);


 const complaints = await this.complaintModel.aggregate(pipeline);

 if(complaints.length === 0 && filterBystatus) {
    return('there are no complaints with the status you entered');
 }

 if (complaints.length === 0  && (!filterBystatus)) {

    return('there are no complaints!');
 }

 return complaints;

        
}


}

