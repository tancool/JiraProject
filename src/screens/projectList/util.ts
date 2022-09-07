import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

// 项目列表搜素的参数
export const useProjectsSearchParams = () => {
  const keys = ['name', 'personId'];
  const [params, setParam] = useUrlQueryParam(keys); // 同步
  return [
    useMemo(()=>({ ...params, personId: Number(params.personId) || undefined }),[params]),
    setParam
  ] as const
}