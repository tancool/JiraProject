import React from 'react';
import { Kanban } from 'types/kanban';
import { useTasks } from 'utils/task';
import { useKanbanSearchParams, useTaskSearchParams } from './util';

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTaskSearchParams());
  const tasks = allTasks?.filter(task => task.kanbanId === kanban.id);
  return <div>
     <h2>{kanban.name}</h2>
    {
      tasks?.map(task=><div>
        {task.name}
      </div>)
    }
  </div>
}