import { Button, Form, Input } from 'antd';
import { useAuth } from 'context/auth-context';
import React from 'react'
import { useDispatch } from 'react-redux';
import { LongButton } from 'unauthenticatedApp';
import { useAsync } from 'utils/useAsync';

// const apiUrl = process.env.REACT_APP_API_URL;

function LoginScreen({ onError }: { onError: (error: Error) => void }) {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(null, { throwOnError: true });

  const dispatch = useDispatch();
  // 原生DOM的登录方式
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
  //   login({ username, password });
  // }

  const handleSubmit = async (values: { username: string, password: string }) => {
    try {
      await run(login(values));
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
        <Form.Item>
          <LongButton htmlType={'submit'} type={'primary'} loading={isLoading}>登录</LongButton>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginScreen;