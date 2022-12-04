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

            return this.ComplaintsService.create(body.title, body.body, req.user.Id);

    }

    
    @Get('/User')
    getUserComplaints(@Request() req){

  return this.ComplaintsService.GetUserComplaints(req.user.Id);

}



    @Patch('/update/:id')
    updateStatus(@Request() req, @Param('id') id: string, @Body() body: UpdateComplaintDto) {

    
        return this.ComplaintsService.updateStatus(id, body.status, req.user.Id);
              
    }



    @Get('/all')
    allComplaints(@Request() req, @Body() body: FilterComplaintsDto){

       return this.ComplaintsService.getAll(body.status,req.user.Id);

}

}
