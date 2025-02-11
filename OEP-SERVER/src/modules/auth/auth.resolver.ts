import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { Result } from "@/common/dto/result.type";
import {
  ACCOUNT_EXIST,
  ACCOUNT_NOT_EXIST,
  CODE_NOT_EXIST,
  CODE_NOT_EXPIRE,
  LOGIN_ERROR,
  REGISTER_ERROR,
  SUCCESS,
} from "@/common/constants/code";
import * as dayjs from "dayjs";
import { JwtService } from "@nestjs/jwt";
import { StudentService } from "../student/student.service";
import * as md5 from "md5";
import { accountAndPwdValidate } from "@/shared/utils";
import { log } from "console";

@Resolver()
export class AuthResover {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly studentService: StudentService
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
    if (dayjs().diff(dayjs(user.codeCreateTimeAt)) > 12 * 30 * 24 * 60 * 60 * 1000) {
      return {
        code: CODE_NOT_EXPIRE,
        message: "code is expired",
      };
    }
    if (user.code === code) {
      const token = this.jwtService.sign({
        id: user.id,
      });
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

  @Mutation(() => Result, { description: "Student login" })
  async studentLogin(
    @Args("account") account: string,
    @Args("password") password: string
  ): Promise<Result> {
    const result = accountAndPwdValidate(account, password);
    if (result.code !== SUCCESS) {
      return result;
    }
    const student = await this.studentService.findByAccount(account);
    if (!student) {
      return {
        code: ACCOUNT_NOT_EXIST,
        message: "Account is not exist",
      };
    }
    if (student.password !== md5(password)) {
      return {
        code: LOGIN_ERROR,
        message: "Login failed",
      };
    }
    if (student.password === md5(password)) {
      const token = this.jwtService.sign({
        id: student.id,
      });
      return {
        code: SUCCESS,
        message: "Login successfully",
        data: token,
      };
    }
  }

  @Mutation(() => Result, { description: "Student Register" })
  async studentRegister(
    @Args("account") account: string,
    @Args("password") password: string
  ): Promise<Result> {
    const result = accountAndPwdValidate(account, password);
    if (result.code !== SUCCESS) {
      return result;
    }
    const student = await this.studentService.findByAccount(account);
    if (student) {
      return {
        code: ACCOUNT_EXIST,
        message: "Account is exist",
      };
    }
    const res = await this.studentService.create({
      account,
      password: md5(password),
    });
    console.log("register info::", res);
    if (res) {
      return {
        code: SUCCESS,
        message: "Register successfully",
      };
    }
    return {
      code: REGISTER_ERROR,
      message: "Register failed",
    };
  }
}
