import React, { ReactNode, useCallback, useState } from 'react';
import * as auth from 'auth-provider';
import { User } from 'screens/projectList/searchPanel';
import { useMount } from 'utils';
import { http } from 'utils/http';
import { useAsync } from 'utils/useAsync';
import { FullPageErrorFallback, FullPageLoading } from 'components/lib';
import * as authStore from 'store/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { bootstrap } from 'store/auth.slice';
export interface AuthForm {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http('me', { token });
    user = data.user;
  }
  return user;
}


export const AuthProvider = ({ children }: { children: ReactNode }) => {

  // const [user, setUser] = useState<User | null>(null);
  // 刷新页面的时候,尝试读取user数据. 如果读取到的时候,就会刷新State.重新刷新DOM
  // useMount(() => bootstrapUser().then(setUser));

  const { data: user, error, isLoading, isIdle, isError, run } = useAsync<User | null>();
  const dispatch: any = useDispatch();

  useMount(() => {
    run(dispatch(bootstrap()));
  });
  if (isIdle || isLoading) {

    //这里的 return 其实返回的是DOM.
    return <FullPageLoading />
  }
  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return (
    <div>
      {children}
    </div>
  )
}

export const useAuth = () => {
  const dispatch: any = useDispatch();
  const user = useSelector(authStore.selectUser);

  const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch]);
  const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch]);
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);

  return {
    user,
    login,
    register,
    logout
  }
}