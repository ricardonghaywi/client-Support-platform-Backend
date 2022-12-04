import { IsString, MinLength } from 'class-validator';

export class CreateComplaintDto {
    
    @IsString()
    @MinLength(2)
    title: string;
    
    @IsString()
    @MinLength(4)
    body: string;


}
