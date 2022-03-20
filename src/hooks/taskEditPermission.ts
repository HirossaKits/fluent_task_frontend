import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectLoginUserInfo } from '../features/auth/authSlice';
import { selectSelectedProject } from '../features/proj/projectSlice';
import { TASK } from '../features/types';

export default function useTaskEditPermission() {
  const loginUserInfo = useSelector(selectLoginUserInfo);
  const selectedProject = useSelector(selectSelectedProject);

  return useCallback((task: TASK | TASK[]) => {
    if (Array.isArray(task)) {
      return (
        selectedProject.resp_id.includes(loginUserInfo.user_id) ||
        task.filter(
          (task) =>
            task.assigned_id !== loginUserInfo.user_id &&
            task.author_id !== loginUserInfo.user_id
        ).length === 0
      );
    } else {
      return (
        selectedProject.resp_id.includes(loginUserInfo.user_id) ||
        task.assigned_id === loginUserInfo.user_id ||
        task.author_id === loginUserInfo.user_id
      );
    }
  }, []);
}
