import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
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
import useInitalizeState from './initializeState';

export default function useBootLoader() {
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const initializeState = useInitalizeState;
  return useCallback(() => {
    const fetchBootLoader = async () => {
      const res = await dispatch(fetchAsyncGetLoginUser());
      if (fetchAsyncGetLoginUser.fulfilled.match(res)) {
        const res = await dispatch(fetchAsyncGetPersonalSettings());
        if (fetchAsyncGetPersonalSettings.fulfilled.match(res)) {
          await dispatch(fetchAsyncGetOrgInfo());
          await dispatch(fetchAsyncGetProject());
          await dispatch(fetchAsyncGetTaskCategory());
          await dispatch(fetchAsyncGetTasks());
          await dispatch(fetchAsycnGetInvite());
        }
      } else {
        initializeState();
        localStorage.removeItem('localJWT');
        history.push('/login');
      }
    };
    fetchBootLoader();
  }, []);
}
