import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  fetchAsyncGetLoginUser,
  fetchAsyncGetPersonalSettings,
} from '../features/auth/authSlice';
import {
  fetchAsyncGetOrgInfo,
  fetchAsycnGetInvite,
} from '../features/org/orgSliece';
import { fetchAsyncGetProject } from '../features/proj/projectSlice';
import {
  fetchAsyncGetTasks,
  fetchAsyncGetTaskCategory,
} from '../features/task/taskSlice';

export default function useBootRoader() {
  const dispatch: AppDispatch = useDispatch();
  return useCallback(() => {
    const fetchBootRoader = async () => {
      const res = await dispatch(fetchAsyncGetLoginUser());
      if (fetchAsyncGetLoginUser.fulfilled.match(res)) {
        await dispatch(fetchAsyncGetPersonalSettings());
        await dispatch(fetchAsyncGetOrgInfo());
        await dispatch(fetchAsyncGetProject());
        await dispatch(fetchAsyncGetTaskCategory());
        await dispatch(fetchAsyncGetTasks());
        await dispatch(fetchAsycnGetInvite());
        return true;
      } else {
        return false;
      }
    };
    fetchBootRoader();
  }, []);
}
