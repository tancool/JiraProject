import { Form, Button, Input } from 'antd';
import { useAuth } from 'context/auth-context';
import React from 'react'
import { LongButton } from 'unauthenticatedApp';
import { useAsync } from 'utils/useAsync';


function RegisterScreen({ onError }: { onError: (error: Error) => void }) {
  const { user, register } = useAuth();
  const { run, isLoading } = useAsync(null,{throwOnError:true});
  // 原生DOM的登录方式
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
  //   register({ username, password });
  // }
  const handleSubmit = async ({ cpassword, ...values }: { username: string, password: string, cpassword: string }) => {
    if (cpassword !== values.password) {
      onError(new Error('请确认两次输入的密码相同'));
      return;
    }

    try {
      await run(register(values));
    } catch (err) {
      onError(err);
    }
  }
  return (
    <div>
      <Form onFinish={handleSubmit}>
        <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
          <Input type="text" placeholder={'用户名'} />
        </Form.Item>
        <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
          <Input type="text" placeholder={'密码'} />
        </Form.Item>
        <Form.Item name={'cpassword'} rules={[{ required: true, message: '请再次输入密码' }]}>
          <Input type="text" placeholder={'确认密码'} />
        </Form.Item>
        <Form.Item>
          <LongButton htmlType={'submit'} type={'primary'} loading={isLoading}>注册</LongButton>
        </Form.Item>
      </Form>
    </div>
  )
}

export default RegisterScreen;