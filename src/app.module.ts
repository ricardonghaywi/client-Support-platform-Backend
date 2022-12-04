import { Module } from '@nestjs/common';
import { MongooseModule} from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ComplaintsModule, MongooseModule.forRoot('mongodb+srv://ricardongh:kakapipi@cluster0.5kwtagx.mongodb.net/?retryWrites=true&w=majority'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
