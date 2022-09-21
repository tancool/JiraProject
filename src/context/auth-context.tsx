import React, { ReactNode, useState } from 'react';
import * as auth from 'auto-provider';
import { User } from 'screens/projectList/searchPanel';
import { useMount } from 'utils';
import { http } from 'utils/http';
import { useAsync } from 'utils/useAsync';
import { FullPageErrorFallback, FullPageLoading } from 'components/lib';
import { useQueryClient } from 'react-query';

interface AuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http('me', { token });
    user = data.user;
  }
  return user;
}

const AuthContext = React.createContext<undefined | {
  user: User | null;
  login: (form: AuthForm) => Promise<void>;
  register: (form: AuthForm) => Promise<void>;
  logout: () => void;
}>(undefined);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  // const [user, setUser] = useState<User | null>(null);
  // 刷新页面的时候,尝试读取user数据. 如果读取到的时候,就会刷新State.重新刷新DOM
  // useMount(() => bootstrapUser().then(setUser));

  const { data: user, error, isLoading, isIdle, isError, run, setData: setUser } = useAsync<User | null>();
  const queryClient = useQueryClient();
  useMount(() => {
    run(bootstrapUser());
  });
  if (isIdle || isLoading) {

    //这里的 return 其实返回的是DOM.
    return <FullPageLoading />
  }
  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => {
    setUser(null);
    queryClient.clear();
  });

  return <AuthContext.Provider value={{ user, login, register, logout }} children={children} />
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在Provider中使用');
  }
  return context;
}