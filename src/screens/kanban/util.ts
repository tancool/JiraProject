import { useLocation } from "react-router-dom";
import { useProject } from "utils/project";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const regx = /projects\/(\d+)/
  const id = pathname.match(regx)?.[1];
  return Number(id);

}
export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()];

export const useTaskSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useTasksQueryKey = () => ['tasks', useTaskSearchParams()];