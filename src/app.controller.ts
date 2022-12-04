import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(private AuthService: AuthService ) {}

 

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {

      return this.AuthService.login(req.user);
}


}
