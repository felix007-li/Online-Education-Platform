// import Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
// import Env from "@alicloud/darabonba-env";
import Dysmsapi, * as $Dysmsapi from "@alicloud/dysmsapi20180501";
// import * as OpenApi from '@alicloud/openapi-client';
import OpenApi, * as $OpenApi from "@alicloud/openapi-client";

// import { config } from "dotenv";
import * as dotenv from "dotenv";

import { getEnvConfig } from ".";

dotenv.config({
  path: getEnvConfig(),
});
// const conf = new OpenApi.Config({
//   accessKeyId: process.env.ACCESS_KEY,
//   accessKeySecret: process.env.ACCESS_KEY_SECRET,
// });

const conf = new $OpenApi.Config({
  accessKeyId: process.env.ACCESS_KEY,
  accessKeySecret: process.env.ACCESS_KEY_SECRET,
  // accessKeyId: Env.getEnv("ACCESS_KEY_ID"),
  // accessKeyId: "LTAI5tShGLDNvyFwZLpoP9YB",
  // accessKeySecret: "t2r87RjsNQDQC0PhGaLlZpYOF5D0U5",
});
// cloud domain
conf.endpoint = "dysmsapi.ap-southeast-1.aliyuncs.com";

export const msgClient = new Dysmsapi(conf);
