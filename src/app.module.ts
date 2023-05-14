import { Module } from '@nestjs/common';
import { MongooseModule} from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ComplaintsModule, MongooseModule.forRoot('mongodb://localhost/sandra'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
