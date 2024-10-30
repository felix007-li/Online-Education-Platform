import { useState, useEffect } from 'react';
import style from './index.module.less';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoginFormPage, ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { message, Tabs } from 'antd';
import { LockOutlined, MobileOutlined } from '@ant-design/icons';
import { useTitle } from '../../hooks';
import { useMutation } from '@apollo/client';
 
interface IValue {
    tel: string;
    code: string;
}
 /**
 *login component
 */
 const Login = () => {
    const [state, setState] = useState();
    // const [login] = useMutation(LOGIN);
    const [params] = useSearchParams();
    const nav = useNavigate();
    useTitle('Login');

    const loginHandler = async (values: IValue) => {
        const res = await login({
            variables: values,
        });
        if (res.data.login.code === 200) {
            message.success(res.data.login.message);
            nav(params.get('orgUrl') || '/')
        }
    };

    useEffect(() => {
        console.log(state, setState);
    }, []);

    return (
        <div className={style.container}>
            <LoginFormPage
                initialValues={{tel: '1123456789'}}
                onFinish={loginHandler}
            >
                <Tabs
                    centered
                    items={[{
                        key: 'phone',
                        label: 'Mobile number login'
                    }]}
                />
                <>
                    <ProFormText 
                        fieldProps={{
                            size: 'large',
                            prefix: <MobileOutlined className='prefixIcon' />,
                        }}
                        name="tel"
                        placeholder="Mobile number"
                        rules={[
                            {
                                required: true,
                                message: 'please enter mobile number',
                            },
                            {
                                pattern: /^1\d{10}$/,
                                message: 'Mobile number error'
                            }
                        ]}
                    />
                    <ProFormCaptcha
                        fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className="prefixIcon" />,
                        }}
                        captchaProps={{
                        size: 'large',
                        }}
                        placeholder="Please enter verication code"
                        phoneName="tel"
                        name="code"
                        rules={[
                        {
                            required: true,
                            message: 'Please enter verication code！',
                        },
                        ]}
                        onGetCaptcha={async (tel: string) => {
                        const res = await run({
                            variables: {
                            tel,
                            },
                        });
                        if (res.data.sendCodeMsg.code === 200) {
                            message.success(res.data.sendCodeMsg.message);
                        } else {
                            message.error(res.data.sendCodeMsg.message);
                        }
                        }}
                    />
                </>
            </LoginFormPage>
        </div>);
 };
 
 export default Login;
 