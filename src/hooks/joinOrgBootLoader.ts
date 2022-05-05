import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { PERSONAL_SETTINGS } from '../features/types';
import {
  fetchAsyncGetLoginUser,
  fetchAsyncUpdateSettings,
} from '../features/auth/authSlice';
import { fetchAsyncGetOrgInfo } from '../features/org/orgSliece';
import { fetchAsyncGetProject } from '../features/proj/projectSlice';
import {
  fetchAsyncGetTaskCategory,
  fetchAsyncGetTasks,
} from '../features/task/taskSlice';

export default function useJoinOrgBootLoader() {
  const dispatch: AppDispatch = useDispatch();
  return useCallback((settings: PERSONAL_SETTINGS) => {
    const fetchBootLoader = async () => {
      const res = await dispatch(fetchAsyncUpdateSettings(settings));
      if (fetchAsyncUpdateSettings.fulfilled.match(res)) {
        const res = await dispatch(fetchAsyncGetLoginUser());
        if (fetchAsyncGetLoginUser.fulfilled.match(res)) {
          await dispatch(fetchAsyncGetOrgInfo());
          await dispatch(fetchAsyncGetProject());
          await dispatch(fetchAsyncGetTaskCategory());
          await dispatch(fetchAsyncGetTasks());
        }
      }
    };
    fetchBootLoader();
  }, []);
}
