import { IsBoolean, IsEmail, IsOptional, IsString, IsAlpha, MinLength, IsEnum } from 'class-validator';
import { Role } from '../schemas/role.enum';


export class CreateUserDto {
    
    @IsString()
    @IsAlpha()
    @MinLength(2)
    firstName: string;

    
    @IsString()
    @IsAlpha()
    @MinLength(2)
    lastName: string;
    
    @IsEmail()
    email: string;
    
    @IsString()
    @MinLength(6)
    password: string;

    @IsBoolean()
    @IsOptional()
    isVip: boolean

    
    @IsEnum(Role)
    @IsOptional()
    role: string;


}