import Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import * as OpenApi from '@alicloud/openapi-client';
import { config } from 'dotenv';
import { getEnvConfig } from '.';

config({
  path: getEnvConfig(),
});
const conf = new OpenApi.Config({
  accessKeyId: process.env.ACCESS_KEY,
  accessKeySecret: process.env.ACCESS_KEY_SECRET,
});
// cloud domain
conf.endpoint = 'dysmsapi.aliyuncs.com';
export const msgClient = new Dysmsapi20170525(conf);