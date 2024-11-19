import { Injectable } from '@nestjs/common';
// import * as Dysmsapi from '@alicloud/dysmsapi20170525';
import Dysmsapi, * as $Dysmsapi from '@alicloud/dysmsapi20180501';
import Util, * as $Util from '@alicloud/tea-util';
import { Result } from "@/common/dto/result.type";
import { UserService } from "../user/user.service";
import { msgClient } from '@/shared/utils/msg';
import * as dayjs from "dayjs";
import { getRandomCode } from "@/shared/utils";
import { CODE_NOT_EXPIRE, CODE_SEND_ERROR, SUCCESS, UPDATE_ERROR } from '@/common/constants/code';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) {}

    async sendCodeMsg(tel: string): Promise<Result> {
        const user = await this.userService.findByTel(tel)
        if (user) {
            const diffTime = dayjs().diff(dayjs(user.codeCreateTimeAt));
            if (diffTime < 60 * 1000) { // code time less than one minute
                return {
                    code: CODE_NOT_EXPIRE,
                    message: 'code is not expired',
                };
            }
        }

        const code = getRandomCode();
        const sendSmsRequest = new $Dysmsapi.SendMessageToGlobeRequest({
            to: tel,
            message: `{\"code\":\"${code}\"}`,
        });
        console.log("sendSmsRequest", sendSmsRequest)
        const runtime = new $Util.RuntimeOptions({});
        console.log("runtime: ", runtime)
        console.log("msgClient: ", msgClient)

        try {
            const sendRes = await msgClient.sendMessageToGlobeWithOptions(
              sendSmsRequest,
              runtime
            );
            console.log("sendRes: ", sendRes)
            if (sendRes.body.responseCode !== 'OK') {
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