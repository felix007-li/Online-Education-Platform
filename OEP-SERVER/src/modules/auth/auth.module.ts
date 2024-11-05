import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleLogger, Module } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { User } from '../user/models/user.entity';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthResover } from './auth.resolver';


@Module({
  imports: [
    JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: 60 * 60 * 24 * 7 + 's',
        },
      }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    UserService,
    ConsoleLogger,
    AuthService,
    AuthResover,
    JwtService
  ],
  exports: [],
})
export class AuthModule {}
