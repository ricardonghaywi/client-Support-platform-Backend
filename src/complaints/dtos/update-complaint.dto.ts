import { Status } from '../schemas/status.enum';
import { IsEnum } from 'class-validator';


export class UpdateComplaintDto {


    @IsEnum(Status)
    status: string;


}