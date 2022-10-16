import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useProject } from "utils/project";
import { useUrlQueryParam } from "utils/url";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const regx = /projects\/(\d+)/
  const id = pathname.match(regx)?.[1];
  return Number(id);

}
export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()];

export const useTaskSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    'name',
    'typeId',
    'processorId',
    'tagId'
  ]);
  const projectId = useProjectIdInUrl();
  return useMemo(() => ({
    projectId,
    typeId: Number(param.typeId) || undefined,
    processorId: Number(param.processorId) || undefined,
    tagId: Number(param.tagId) || undefined,
    name: param.name
  }), [projectId, param]);
}

export const useTasksQueryKey = () => ['tasks', useTaskSearchParams()];