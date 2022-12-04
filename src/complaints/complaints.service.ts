import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ComplaintDocument } from './schemas/complaint.schema';



@Injectable()
export class ComplaintsService {

    constructor(@InjectModel('Complaint') private complaintModel: Model<ComplaintDocument>) {}


    async create(title: string, body: string, creator: string ){
        const Newcomplaint = new this.complaintModel({
            title,
            body,
            creator,
        
        });

        const result = await Newcomplaint.save();
        return result;

    }



    async updateStatus(id: string, status: string){

        const complaint = await this.complaintModel.findById(id);
        if(!complaint) {
            throw new NotFoundException('Could not find complaint!');
        }

        complaint.status = status;

        complaint.save();
        return complaint;


    }



    async GetUserComplaints(userid: string) {

        const complaints = await this.complaintModel.find({creator: userid});

        if(!complaints) {
            return('you have not issued any complaint')
        }

        return complaints;
    }




    async getAll(filterBystatus: string){

        const  Status  = filterBystatus;

        
        
        const complaints = await  this.complaintModel.aggregate([


            {
                $lookup: {
                    from: 'users',
                    localField: 'creator',
                    foreignField: '_id',
                    as: 'User'
                }

            },

            {$unwind: '$User'},

            {
                $sort:{
                    createdDate: -1
                }
            },

        
            {
                $match:{
                    ...(Status ? { status: Status } : {} ),
                }
            },

          
            {
                $group: {
                    _id: null,
                    Vip:{
                        $push: {
                            $cond: [
                                {
                                $eq: ['$User.isVip', true]
                        },

                        '$$ROOT',
                        '$$REMOVE',
                    ],
      
                        }
                    },

                    NonVip: {

                        $push: {
                            $cond: [

                                {
                                    $eq: ['$User.isVip', false],

                                },
                                '$$ROOT',
                                '$$REMOVE',
                            ]
                        },
                     
                      

                    }

                }
            },

        
            {
                $project: {

                    _id: 0,

                    "Vip.User.firstName": 1,
                     "Vip.User.lastName": 1,
                     "Vip.User.email": 1,
                     'Vip.title': 1,
                     'Vip.body': 1,
                     'Vip.status': 1,
                     'Vip.createdDate': 1,
                    

                      "NonVip.User.firstName": 1,
                      "NonVip.User.lastName": 1,
                      "NonVip.User.email": 1,
                      'NonVip.title': 1,
                     'NonVip.body': 1,
                     'NonVip.status': 1,
                     'NonVip.createdDate': 1,
                     
                }
            },

            



        ]);

        return complaints;



    }

    
}

