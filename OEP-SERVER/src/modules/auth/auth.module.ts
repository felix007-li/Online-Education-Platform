import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { User } from '../user/models/user.entity';
import { AuthService } from './auth.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    UserService,
    AuthService
  ],
  exports: [],
})
export class AuthModule {}
