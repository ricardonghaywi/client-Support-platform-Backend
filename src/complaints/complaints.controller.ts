import { Controller, Body, Post, Get, Patch, Param,UseGuards, Request, UnauthorizedException  } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dtos/create-complaint.dto';
import { UpdateComplaintDto } from './dtos/update-complaint.dto';
import { FilterComplaintsDto } from './dtos/filter-complaint.dto';



@UseGuards(JwtAuthGuard)
@Controller('complaints')
export class ComplaintsController {
    
    constructor(private ComplaintsService: ComplaintsService) {}

    

    @Post('/New')
    createComplaint(@Request() req , @Body() body: CreateComplaintDto){

        if( req.user.role === 'USER') {

            return this.ComplaintsService.create(body.title, body.body, req.user.Id);

        }

        throw new UnauthorizedException; 

    }

    
    @Get('/User')
    getUserComplaints(@Request() req){
        if ( req.user.role === 'User') {

        return this.ComplaintsService.GetUserComplaints(req.user.Id);

        }

        throw new UnauthorizedException

}



    @Patch('/update/:id')
    updateStatus(@Request() req, @Param('id') id: string, @Body() body: UpdateComplaintDto) {

        if (req.user.role === 'ADMIN') {
        return this.ComplaintsService.updateStatus(id, body.status);
        }

        throw new UnauthorizedException;
              
    }



    @Get('/all')
    allComplaints(@Request() req, @Body() body: FilterComplaintsDto){

      if ( req.user.role === 'ADMIN') {
        return this.ComplaintsService.getAll(body.status);
      
         }

         throw new UnauthorizedException;

}

}
