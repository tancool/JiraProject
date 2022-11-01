import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "utils";


interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success';
}

// 这个是正确的赋值.用来测试interface
// const cd: State<{ c: null }> = {
//     error: null,
//     data: { c: null },
//     stat:'loading'
// }


// 由这段代码可以确认的是.  <D>(initialState?: State<D>), 先得到的是括号里的D(而括号里的D又是推导进入interface中得到的),之后再推断出括号外的D

// useAsync({ data: 123, error: null, stat: 'idle' });

// 默认的State
const defaultInitialState: State<null> = {
  error: null,
  stat: 'idle',
  data: null,
}

const defaultConfig = {
  throwOnError: false
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback((...args: T[]) => { mountedRef.current ? dispatch(...args) : void 0 }, [dispatch, mountedRef]);
}

// initialState 用户传入的State
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => { // ts中的typeof 用于获取一个变量或者属性的类型

  const config = { ...defaultConfig, ...initialConfig };

  // const [state, setState] = useState<State<D>>({ // 指定State的类型
  //   ...defaultInitialState,
  //   ...initialState
  // });
  const reducer = (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action });
  const [state, dispatch] = useReducer(reducer, {
    ...defaultInitialState,
    ...initialState
  })

  const safeDispatch = useSafeDispatch(dispatch);
  // 刷新功能(使用的是惰性初始化)
  const [retry, setRetry] = useState(() => () => { });
  // 请求成功
  const setData = useCallback((data: D) => safeDispatch({
    // 执行setState的时候,会重新刷新页面
    data,
    stat: 'success',
    error: null,
  }), [safeDispatch]);

  const setError = useCallback((error: Error) => safeDispatch({
    error,
    stat: 'error',
    data: null
  }), [safeDispatch]);

  // run用来触发异步请求
  const run = useCallback((promise: Promise<D>, runConfig?: ({ retry: () => Promise<D> })) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 Promise 类型数据');
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig);
      }
    });

    // setState({ ...state, stat: 'loading' });
    safeDispatch({ stat: 'loading' });
    return promise.then(data => {
      setData(data);
      // 执行 return的时候,是为了方便有函数需要及时拿到结果
      return data;

    }).catch(error => {
      setError(error);
      if (config.throwOnError) {
        return Promise.reject(error);
      }
      return error;
    })
  }, [config.throwOnError,safeDispatch, setData, setError]);

  // Hook返回的内容=> 返回的内容比较多(因为异步操作就是有很多信息可以获取的).
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error', // 这个Error只适用于异步的情况, 同步的Error抛出需要及时抛出错误 => return Promise.reject(error);
    isSuccess: state.stat === 'success',
    run,
    retry,
    setData,
    setError,
    ...state
  }
}

