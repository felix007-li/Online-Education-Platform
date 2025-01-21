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
});
// cloud domain
conf.endpoint = "dysmsapi.ap-southeast-1.aliyuncs.com";

export const msgClient = new Dysmsapi(conf);
