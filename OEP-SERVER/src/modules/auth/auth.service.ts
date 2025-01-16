import { Injectable } from "@nestjs/common";
// import * as Dysmsapi from '@alicloud/dysmsapi20170525';
import Dysmsapi, * as $Dysmsapi from "@alicloud/dysmsapi20180501";
import Util, * as $Util from "@alicloud/tea-util";
import { Result } from "@/common/dto/result.type";
import { UserService } from "../user/user.service";
import { msgClient } from "@/shared/utils/msg";
import * as dayjs from "dayjs";
import { getRandomCode } from "@/shared/utils";
import {
  CODE_NOT_EXPIRE,
  CODE_SEND_ERROR,
  SUCCESS,
  UPDATE_ERROR,
} from "@/common/constants/code";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService
  ) {}

  async sendCodeMsg(tel: string): Promise<Result> {
    const user = await this.userService.findByTel(tel);
    if (user) {
      const diffTime = dayjs().diff(dayjs(user.codeCreateTimeAt));
      if (diffTime < 30 * 24 * 60 * 60 * 1000) {
        // don't send code less than one minute
        // code time less than one minute
        return {
          code: CODE_NOT_EXPIRE,
          message: "code is not expired",
        };
      }
    }

    const code = getRandomCode();
    const sendSmsRequest = new $Dysmsapi.SendMessageToGlobeRequest({
      from: "18773124359",
      to: tel,
      type: "OTP",
      message: `{your login code is: ${code}, please login in a minute\"}`,
    });
    const runtime = new $Util.RuntimeOptions({});

    try {
      const sendRes = await msgClient.sendMessageToGlobeWithOptions(
        sendSmsRequest,
        runtime
      );
      
      if (sendRes.body.responseCode !== "OK") {
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
            message: "Get code successfully",
          };
        }
        return {
          code: UPDATE_ERROR,
          message: "Update code failed",
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
          message: "Get code successfully!",
        };
      }
      return {
        code: UPDATE_ERROR,
        message: "Create user failed",
      };
    } catch (error) {
      // print error
      Util.assertAsString(error.message);
    }
  }
}
