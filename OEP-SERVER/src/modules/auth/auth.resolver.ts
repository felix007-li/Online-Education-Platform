import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { Result } from "@/common/dto/result.type";
import {
  CODE_NOT_EXIST,
  CODE_NOT_EXPIRE,
  LOGIN_ERROR,
  SUCCESS,
} from "@/common/constants/code";
import * as dayjs from "dayjs";
import { JwtService } from "@nestjs/jwt";

@Resolver()
export class AuthResover {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  @Mutation(() => Result, { description: "Send shot message code" })
  async sendCodeMsg(@Args("tel") tel: string): Promise<Result> {
    return await this.authService.sendCodeMsg(tel);
  }

  @Mutation(() => Result, { description: "Login" })
  async login(
    @Args("tel") tel: string,
    @Args("code") code: string
  ): Promise<Result> {
    let user = await this.userService.findByTel(tel);
    if (!user) {
      const re = await this.userService.create({
        tel,
      });
      if (re) {
        user = await this.userService.findByTel(tel);
      } else {
        return {
          code: LOGIN_ERROR,
          message: "Login failed, error tel",
        };
      }
    }

    if (!user.codeCreateTimeAt || !user.code) {
      return {
        code: CODE_NOT_EXIST,
        message: "code is not exist",
      };
    }
    if (dayjs().diff(dayjs(user.codeCreateTimeAt)) > 60 * 60 * 1000) {
      return {
        code: CODE_NOT_EXPIRE,
        message: "code is expired",
      };
    }
    if (user.code === code) {
      console.log("user::", user);
      console.log("secret::", `${process.env.JWT_SECRET}`);
      console.log("host::", process.env.MYSQL_HOST);

      const token = this.jwtService.sign({
        id: user.id,
      });
      console.log("token::", token);
      return {
        code: SUCCESS,
        message: "Login successfully!!!!",
        data: token,
      };
    }
    return {
      code: LOGIN_ERROR,
      message: "Login failed",
    };
  }
}
