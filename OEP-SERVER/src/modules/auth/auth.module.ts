import { TypeOrmModule } from "@nestjs/typeorm";
import { ConsoleLogger, Module } from "@nestjs/common";
import { UserService } from "./../user/user.service";
import { User } from "../user/models/user.entity";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthResover } from "./auth.resolver";
import { JwtStrategy } from "./jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Student } from "../student/models/student.entity";
import { StudentService } from "../student/student.service";
// import * as dotenv from "dotenv";
// dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      // imports: [ConfigModule],
      // useFactory: async (configService: ConfigService) => {
      //   return {
      //     secret: configService.get<string>("JWT_SECRET"),
      //     signOptions: {
      //       expiresIn: 60 * 60 * 24 * 7 + "s",
      //     },
      //   };
      // },
      // inject: [ConfigService],
      secret: `${process.env.JWT_SECRET}`,
      signOptions: {
        expiresIn: 60 * 60 * 24 * 7 * 4 + "s",
      },
    }),
    // ConfigModule,
    TypeOrmModule.forFeature([User, Student]),
  ],
  providers: [
    JwtStrategy,
    UserService,
    ConsoleLogger,
    AuthService,
    AuthResover,
    StudentService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
