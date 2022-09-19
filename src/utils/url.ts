import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

/**
 * 返回页面url中, 指定键的参数值
*/
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams(); // 这个是一个状态.也就是useState.
  return [
    useMemo(
      () => keys.reduce((prev, key) => {
        return { ...prev, [key]: searchParams.get(key) };
      }, {} as { [key in K]: string }),
      [searchParams])
    ,
    // setSearchParams // 这里如果直接这样传递出去的话,是不利于类型转换的.
    (params: Partial<{ [key in K]: unknown }>) => {

      const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit; // 覆盖参数. 这里涉及了iterator的概念
      return setSearchParams(o);
    }
  ] as const;
}


export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams()
  return (params: { [key in string]: unknown }) => {
      const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
      return setSearchParam(o)
  }
}