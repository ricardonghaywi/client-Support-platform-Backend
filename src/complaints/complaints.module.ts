import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComplaintsService } from './complaints.service';
import { ComplaintsController } from './complaints.controller';
import { ComplaintSchema } from './schemas/complaint.schema';



@Module({
  imports: [MongooseModule.forFeature([{name: 'Complaint' , schema: ComplaintSchema}])],
  providers: [ComplaintsService],
  controllers: [ComplaintsController]
})
export class ComplaintsModule {}
