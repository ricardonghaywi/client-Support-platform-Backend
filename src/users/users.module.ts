import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { UsersController } from './users.controller';
import { UserSchema } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';


@Module({
  imports: [MongooseModule.forFeature([ { name: 'User' , schema: UserSchema}])],
  providers: [UsersService, AuthService, JwtService, LocalStrategy],
  controllers: [UsersController],
  exports:[UsersService]
})
export class UsersModule {}
