import { useCallback } from 'react';
import { TASK, EDITED_TASK } from '../features/types';
const useShapeTask = () => {
  return useCallback((task: TASK): EDITED_TASK => {
    return {
      task_id: task.task_id,
      task_name: task.task_name,
      project_id: task.project_id,
      task_category_id: task.task_category_id,
      assigned_id: task.assigned_id,
      author_id: task.author_id,
      status: task.status,
      description: task.description,
      estimate_manhour: task.estimate_manhour,
      actual_manhour: task.actual_manhour,
      scheduled_startdate: task.scheduled_startdate,
      scheduled_enddate: task.scheduled_enddate,
      actual_startdate: task.actual_startdate,
      actual_enddate: task.actual_enddate,
      created_at: task.created_at,
      update_at: task.update_at,
    };
  }, []);
};

export default useShapeTask;
