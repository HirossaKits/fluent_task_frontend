import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAsyncGetOrgInfo } from '../features/org/orgSliece';
import { fetchAsyncGetProject } from '../features/proj/projectSlice';
import { fetchAsyncGetTaskCategory } from '../features/task/taskSlice';
import { fetchAsyncGetTasks } from '../features/task/taskSlice';

export default function useChangeOrgBootLoader() {
  const dispatch = useDispatch();
  return useCallback(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetOrgInfo());
      await dispatch(fetchAsyncGetProject());
      await dispatch(fetchAsyncGetTaskCategory());
      await dispatch(fetchAsyncGetTasks());
    };
    fetchBootLoader();
  }, []);
}
