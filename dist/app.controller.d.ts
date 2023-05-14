import { AuthService } from './auth/auth.service';
export declare class AppController {
    private AuthService;
    constructor(AuthService: AuthService);
    login(req: any): Promise<{
        access_token: string;
    }>;
}
