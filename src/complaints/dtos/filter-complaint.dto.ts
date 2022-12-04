import { Status } from '../schemas/status.enum';
import { IsEnum, IsOptional} from 'class-validator';


export class FilterComplaintsDto {


    @IsEnum(Status)
    @IsOptional()
    status: string;


}