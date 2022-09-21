import { log } from "console";
import { useCallback, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "screens/projectList/list";
import { useProjectsSearchParams } from "screens/projectList/util";
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
  const [searchParams] = useProjectsSearchParams();
  const queryKey = ['projects', searchParams]
  return useMutation((params: Partial<Project>) => client(`projects/${params.id}`, {
    method: 'PATCH',
    data: params
  }), {
    // 成功时的回调函数
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: Partial<Project>) { // target存储的是当前的数据
      const previousItems = queryClient.getQueriesData(queryKey)
      queryClient.setQueriesData(queryKey, (old?: Project[]) => {
        return old?.map(project => project.id === target.id ? { ...project, ...target } : project) || []
      })

      return { previousItems }
    },
    onError(error, newItem: Partial<Project>, context:any) {
      queryClient.setQueriesData(queryKey, (context as { previousItems: Project }).previousItems)
    }
  },)
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
  return useMutation((params: Partial<Project>) => client(`projects`, {
    data: params,
    method: 'POST'
  }), {
    onSuccess: () => queryClient.invalidateQueries('projects')
  })

}


export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ['project', { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id
    }
  )
}