import { useQuery } from "react-query";
import { Project } from "types/project";
import { User } from "types/user";
import { cleanObject, useMount } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";

// export const useUsers = (param: Partial<User>={}) => {

//   const client = useHttp();
//   const { run, ...result } = useAsync<User[]>();

//   useMount(() => {
//     run(client('users', { data: cleanObject(param) }));
//   });

//   return result;
// }

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  return useQuery<User[]>(['users', param], () => client('users', { data: param }));
}