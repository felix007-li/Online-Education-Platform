/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import md5 from 'md5';
import {
  Button, Form, Input, Space,
} from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';

import style from './index.module.less';

interface IValue {
  password: string;
  account: string;
}

/**
* 登录页面
*/
const Login = () => {
  const [visible, setVisible] = useState(false);
  const nav = useNavigate();

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img src="https://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/henglogo.png" alt="" />
      </div>
      <Form
        layout="horizontal"
        footer={(
          <Button block type="submit" color="primary" size="large">
            Login
          </Button>
        )}
      >
        <Form.Item
          label="username"
          name="account"
        >
          <Input placeholder="Plese enter username" clearable />
        </Form.Item>
        <Form.Item
          label="password"
          name="password"
        >
          <Input
            placeholder="Plese enter password"
            clearable
            type={visible ? 'text' : 'password'}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
