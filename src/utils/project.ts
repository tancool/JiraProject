import { useCallback, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "screens/projectList/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";


export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  // const { run, ...result } = useAsync<Project[]>();
  // const fetchProjects = useCallback(() => client('projects', { data: cleanObject(param) }), [client, param]);
  // useEffect(() => {
  //   run(fetchProjects(), { retry: fetchProjects });
  // }, [param, run, fetchProjects]);

  // return result;
  return useQuery<Project[]>(['projects', param], () => client('projects', { data: param }));
}

export const useEditProject = () => {
  const client = useHttp();

  // const { run, ...asyncResult } = useAsync();
  // const mutate = (params: Partial<Project>) => {
  //   return run(client(`projects/${params.id}`, {
  //     data: params,
  //     method: 'PATCH'
  //   }))
  // }
  // return {
  //   mutate,
  //   ...asyncResult
  // }

  const queryClient = useQueryClient();
  return useMutation((params: Partial<Project>) => client(`projects/${params.id}`, {
    method: 'PATCH',
    data: params
  }), {
    onSuccess: () => queryClient.invalidateQueries('projects')
  })
}

export const useAddProject = () => {
  const client = useHttp();

  // const { run, ...asyncResult } = useAsync();
  // const mutate = (params: Partial<Project>) => {
  //   return run(client(`projects/${params.id}`, {
  //     data: params,
  //     method: 'POST'
  //   }))
  // }
  // return {
  //   mutate,
  //   ...asyncResult
  // }

  const queryClient = useQueryClient();
  return useMutation((params: Partial<Project>) => client(`projects/${params.id}`, {
    data: params,
    method: 'POST'
  }), {
    onSuccess: () => queryClient.invalidateQueries('projects')
  })

}