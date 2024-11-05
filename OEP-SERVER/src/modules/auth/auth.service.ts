import { Injectable } from '@nestjs/common';
import * as Dysmsapi from '@alicloud/dysmsapi20170525';
import Util, * as utils from '@alicloud/tea-util';
import { Result } from "@/common/dto/result.type";
import { UserService } from "../user/user.service";
import dayjs from "dayjs";
import { getRandomCode } from "@/shared/utils";
import { CODE_NOT_EXPIRE, CODE_SEND_ERROR, SUCCESS, UPDATE_ERROR } from '@/common/constants/code';
import { msgClient } from '@/shared/utils/msg';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) {}

    async sendCodeMsg(tel: string): Promise<Result> {
        const user = await this.userService.findByTel(tel)

        if (user) {
            const diffTime = dayjs().diff(dayjs(user.codeCreateTimeAt))
            if (diffTime < 60 * 1000) { // code time less than one minute
                return {
                    code: CODE_NOT_EXPIRE,
                    message: 'code is not expired'
                };
            }
        }

        const code = getRandomCode();
        const sendSmsRequest = new Dysmsapi.SendSmsRequest({
            signName: process.env.SIGN_NAME,
            templateCode: process.env.TEMPLATE_CODE,
            phoneNumbers: tel,
            templateParam: `{\"code\":\"${code}\"}`,
        });
        const runtime = new utils.RuntimeOptions({});
        try {
            const sendRes = await msgClient.sendSmsWithOptions(
              sendSmsRequest,
              runtime
            );
            if (sendRes.body.code !== 'OK') {
              return {
                code: CODE_SEND_ERROR,
                message: sendRes.body.message,
              };
            }
            if (user) {
              const result = await this.userService.updateCode(user.id, code);
              if (result) {
                return {
                  code: SUCCESS,
                  message: 'Get code successfully',
                };
              }
              return {
                code: UPDATE_ERROR,
                message: 'Update code failed',
              };
            }
            const result = await this.userService.create({
              tel,
              code,
              codeCreateTimeAt: new Date(),
            });
            if (result) {
              return {
                code: SUCCESS,
                message: 'Get code successfully!',
              };
            }
            return {
              code: UPDATE_ERROR,
              message: 'Create user failed',
            };
          } catch (error) {
            // print error
            Util.assertAsString(error.message);
          }
    }
}