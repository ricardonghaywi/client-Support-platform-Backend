import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComplaintsService } from './complaints.service';
import { ComplaintsController } from './complaints.controller';
import { ComplaintSchema } from './schemas/complaint.schema';
import { UsersModule } from 'src/users/users.module';




@Module({
  imports: [MongooseModule.forFeature([{name: 'Complaint' , schema: ComplaintSchema}]),
UsersModule],
  providers: [ComplaintsService],
  controllers: [ComplaintsController]
})
export class ComplaintsModule {}
