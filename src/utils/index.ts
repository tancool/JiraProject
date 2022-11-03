import { useEffect, useRef, useState } from 'react';

export const isFalsely = (value: any) => value === 0 ? false : !value;

export const isVoid = (value: unknown) => value === null || value === undefined || value === '';

// 由于可能存在 name值为空的情况,这些参数是不能够传递给后端的.所以要尽量避免这种歧义的存在
export const cleanObject = (object?: { [key: string]: unknown }) => {
  if (!object) {
    return {};
  }
  const result = { ...object };
  Object.keys(result).forEach(key => {
    const value = result[key];
    if (isFalsely(value)) {
      delete result[key];
    }
  })
  return result;
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export const useDebounce = <V>(params: V, delay?: number) => {

  // useState只在初始化的时候执行一次,以后即使params函数发生变化了,useState也不会重新的去执行.只有通过SetState去改变数据.
  const [debounceValue, setDebounceValue] = useState(params);

  useEffect(() => {

    // 由于setTimeout没有被释放,所以timer这个变量也没有被销毁.
    // 下次再执行useEffect的时候,创建的又是一个新的 timer.

    // 如果参数发生改变,那么就会重新渲染页面.进而执行useDebounce,而此刻debounceValue已经发生了变化,那么就会去执行UI界面的useEffect.
    const timer = setTimeout(() => setDebounceValue(params), delay);

    // 如果这里返回的不是一个函数的话,则会在执行完副作用函数之后,紧接着就去执行此段代码.而不会在组件销毁时去执行副作用函数的return函数
    return () => clearTimeout(timer);

    // 这里监听的并不是debounceValue , 而是 params=> 函数每次传递的params都是不同的. 而该函数的useState并不会重复的去执行
  }, [params, delay]);


  return debounceValue;
}

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {

  // useRef在整个生命周期内,是不会发生变化的. useRef就相当于一个容器.
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // 这里是一个闭包.只是引用了第一个.
        document.title = oldTitle;
      }
    }
  }, [keepOnUnmount, oldTitle])
}


// 不仅重置路由状态,也可以刷新整个页面
export const resetRute = () => window.location.href = window.location.origin;


/**
 * 返回组件的挂载状态, 如果还没挂载或者已经卸载, 返回false. 反之,返回true.
*/
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    }
  })
  return mountedRef;
}



//**********
// 无关次项目的代码

// 这个useHook是作业.
// 这里<T>和 T[]. 理解怎么使用的即可.
// 等到日后有空上网上查查
export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    }
  }
}
interface IValue {
  name: string;
  age: number;
}
const value = [
  { name: 'join', age: 12 },
  { name: 'join1', age: 121 },
  { name: 'join2', age: 122 },
]
// useArray<IValue>(value); // 这种是显式指定的方式.
// useArray(value);

// 无关代码
//**********


interface Base {
  id: number
}
interface Advance extends Base {
  name: string
}
const test = (p: Base) => { }
const a: Advance = { id: 1, name: 'jack' };

test(a); // 这样做是可以的
