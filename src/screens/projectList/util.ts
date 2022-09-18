import { useMemo } from "react";
import { useProject } from "utils/project";
import { useUrlQueryParam } from "utils/url";

// 项目列表搜素的参数
export const useProjectsSearchParams = () => {
  const keys = ['name', 'personId'];
  const [params, setParam] = useUrlQueryParam(keys); // 同步
  return [
    useMemo(() => ({ ...params, personId: Number(params.personId) || undefined }), [params]),
    setParam
  ] as const
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate']);
  const [{ editingProjectId }, setEditingProject] = useUrlQueryParam(['editingProjectId']);

  const { data: editingProject, isLoading } = useProject(Number(editingProjectId))

  const open = () => setProjectCreate({ projectCreate: true });;
  const close = () => {
    setProjectCreate({ projectCreate: false });
    setEditingProject({ editingProjectId: undefined });
  }
  const startEdit = (id: number) => setEditingProject({ editingProjectId: id });
  return {
    projectModalOpen: projectCreate === 'true' || !!editingProject,
    open,
    close,
    editingProject,
    isLoading,
    startEdit
  }
}