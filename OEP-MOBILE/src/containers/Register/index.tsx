import {
  Button, Form, Input, Space,
} from 'antd-mobile';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import md5 from 'md5';
import { STUDENT_REGISTER } from '@/graphql/user';
import { showFail, showSuccess } from '@/utils';
import style from './index.module.less';

interface IValue {
  password: string;
  account: string;
}

/**
* Register
*/
const Register = () => {
  const [form] = Form.useForm();
  const [register, { loading }] = useMutation(STUDENT_REGISTER);
  const nav = useNavigate();

  const onRegisterHandler = async (values: IValue) => {
    const res = await register({
      variables: {
        password: md5(values.password),
        account: values.account,
      },
    });
    if (res.data.studentRegister.code === 200) {
      showSuccess(res.data.studentRegister.message);
      nav('/login');
      return;
    }
    const data = res.data.studentRegister;
    showFail(data);
  };

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img src="/src/assets/logo.png" alt="logo" />
      </div>
      <Form
        form={form}
        layout="horizontal"
        onFinish={onRegisterHandler}
        footer={(
          <Button loading={loading} block type="submit" color="primary" size="large">
            Register
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
          label="Username"
          name="account"
        >
          <Input placeholder="Please enter username" clearable />
        </Form.Item>
        <Form.Item
          rules={[{
            required: true,
            message: 'Password is required',
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,}$/,
            message: 'Password must be at least 6 digits and letters and the letter must be lowercase',
          }]}
          label="Password"
          name="password"
        >
          <Input
            placeholder="Please enter password"
            clearable
            type="password"
          />
        </Form.Item>
        <Form.Item
          rules={[{
            required: true,
            message: 'Password is required',
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,}$/,
            message: 'Password must be at least 6 digits and letters',
          }, {
            validator: (_rule, value) => {
              if (value !== form.getFieldValue('password')) {
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject('The two passwords do not match');
              }
              return Promise.resolve();
            },
          },
          ]}
          label="Confirm Password"
          name="passwordConfirm"
        >
          <Input
            placeholder="Please enter password again"
            clearable
            type="password"
          />
        </Form.Item>
      </Form>
      <div>
        <Space>
          There is already an account?
          {' '}
          <Link to="/login">Login</Link>
        </Space>
      </div>
    </div>
  );
};

export default Register;
