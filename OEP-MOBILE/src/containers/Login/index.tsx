/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import md5 from 'md5';
import {
  Button, Form, ImageUploader, Input, Space,
} from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { useUploadOSS } from '@/hooks/useUploadOSS';

import style from './index.module.less';
import { STUDENT_LOGIN } from '@/graphql/user';
import { AUTH_TOKEN } from '@/utils/constants';
import { showFail, showSuccess } from '@/utils';
import { useUserContext } from '@/hooks/useHooks';

interface IValue {
  password: string;
  account: string;
}

/**
* login page
*/
const Login = () => {
  const uploadHandler = useUploadOSS();
  const [visible, setVisible] = useState(false);
  const { store } = useUserContext();
  const nav = useNavigate();
  const [login, { loading }] = useMutation(STUDENT_LOGIN);

  const loginHandler = async (values: IValue) => {
    const res = await login({
      variables: {
        password: md5(values.password),
        account: values.account,
      },
    });
    if (res.data.studentLogin.code === 200) {
      showSuccess(res.data.studentLogin.message);
      store.refetchHandler();
      localStorage.setItem(AUTH_TOKEN, res.data.studentLogin.data);
      nav('/');
      return;
    }
    const data = res.data.studentLogin;
    showFail(data);
  };

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img src="/src/assets/logo.png" alt="logo" />
      </div>
      <Form
        layout="horizontal"
        onFinish={loginHandler}
        footer={(
          <Button block type="submit" color="primary" size="large">
            Login
          </Button>
        )}
      >
        <Form.Item
          rules={[{
            required: true,
            message: 'Username is required',
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,10}$/,
            message: 'Username must be 6-10 digits and letters',
          }]}
          label="username"
          name="account"
        >
          <Input placeholder="Plese enter username" clearable />
        </Form.Item>
        <Form.Item
          rules={[{
            required: true,
            message: 'Password is required',
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,}$/,
            message: 'Password must be at least 6 digits and letters and the letter must be lowercase',
          }]}
          extra={(
            <div className={style.eye}>
              {!visible ? (
                <EyeInvisibleOutline onClick={() => setVisible(true)} />
              ) : (
                <EyeOutline onClick={() => setVisible(false)} />
              )}
            </div>
            )}
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
      <div>
        <Space>
          There is no account yet?
          <Link to="/register">Register</Link>
        </Space>
      </div>
    </div>
  );
};

export default Login;
