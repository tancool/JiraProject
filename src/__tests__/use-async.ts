import { useAsync } from "utils/useAsync";
import { renderHook, act } from '@testing-library/react-hooks'
const defaultState: ReturnType<typeof useAsync> = {
  stat: 'idle',
  data: null,
  error: null,

  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,

  run: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
  retry: expect.any(Function),
}

const loadingState: ReturnType<typeof useAsync> = {
  ...defaultState,
  stat: 'loading',
  isIdle: false,
  isLoading: true
};
const successState: ReturnType<typeof useAsync> = {
  ...defaultState,
  stat: 'success',
  isIdle: false,
  isSuccess: true
};

test('useAsync 可以异步处理', async () => {
  // 让Promise状态可以在Promise状态之外进行改变
  let resolve: any, reject: any;
  const promise = new Promise((r, j) => {
    resolve = r;
    reject = j;
  });

  // 开始运行Hook
  const { result } = renderHook(() => useAsync());

  expect(result.current).toEqual(defaultState);

  let p: Promise<any>;

  // 相关的异步方法放在act里
  act(() => {
    p = result.current.run(promise)
  });
  expect(result.current).toEqual(loadingState);

  const resolvedValue = { mockValue: 'resolved' };
  await act(async () => {
    resolve(resolvedValue);
    await p;
  });
  expect(result.current).toEqual({
    ...successState,
    data: resolvedValue
  })

})