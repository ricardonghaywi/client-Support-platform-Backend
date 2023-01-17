import { Expose } from 'class-transformer';

export class UserDto {

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;
 
    @Expose()
    email: string;
    
    @Expose()
    isVip: boolean;
     
    @Expose()
    isAdmin: boolean;

    
}
