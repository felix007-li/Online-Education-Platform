import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { Result } from "@/common/dto/result.type";
import { CODE_NOT_EXIST, CODE_NOT_EXPIRE, LOGIN_ERROR, SUCCESS } from "@/common/constants/code";
import dayjs from "dayjs";

@Resolver()
export class AuthResover {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Mutation(() => Result, { description: 'Send code error'})
    async sendCodeMsg(@Args('tel') tel: string): Promise<Result> {
        return await this.authService.sendCodeMsg(tel);
    }

    @Mutation(() => Result, { description: 'Login'})
    async login(
        @Args('tel') tel: string,
        @Args('code') code: string,
    ): Promise<Result> {
        let user = await this.userService.findByTel(tel);

        if(!user) {
            const re = await this.userService.create({
                tel,
            });
            if (re) {
                user = await this.userService.findByTel(tel);
            } else {
                return {
                    code: LOGIN_ERROR,
                    message: 'Login failed, error tel'
                }
            }
        }

        if (!user.codeCreateTimeAt || !user.code) {
            return {
              code: CODE_NOT_EXIST,
              message: '验证码不存在',
            };
          }
          if (dayjs().diff(dayjs(user.codeCreateTimeAt)) > 60 * 60 * 1000) {
            return {
              code: CODE_NOT_EXPIRE,
              message: '验证码过期',
            };
          }
          if (user.code === code) {
            return {
              code: SUCCESS,
              message: '登录成功',
            };
          }
    }
}