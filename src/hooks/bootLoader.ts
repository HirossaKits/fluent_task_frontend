import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  fetchAsyncGetLoginUser,
  fetchAsyncGetPersonalSettings,
  fetchAsyncUpdateSettings,
  selectLoginUserInfo,
  selectPersonalSettings,
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
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const loginUserInfo = useSelector(selectLoginUserInfo);
  const personalSettings = useSelector(selectPersonalSettings);
  return useCallback(() => {
    const fetchBootRoader = async () => {
      const res = await dispatch(fetchAsyncGetLoginUser());
      if (fetchAsyncGetLoginUser.fulfilled.match(res)) {
        await dispatch(fetchAsyncGetPersonalSettings());

        if (!personalSettings.private_mode) {
          const publicOrgId = loginUserInfo.joined_org.reduce(
            (pre: string[], cur) =>
              !cur.is_private ? [...pre, cur.org_id] : pre,
            []
          );
          // settings の selected_org_id に所属している場合
          if (publicOrgId.includes(personalSettings.selected_org_id)) {
            return;
          }
          // settings の selected_org_id に所属していない場合
          else {
            await dispatch(
              fetchAsyncUpdateSettings({
                ...personalSettings,
                selected_org_id: publicOrgId[0],
              })
            );
          }
        }

        await dispatch(fetchAsyncGetOrgInfo());
        await dispatch(fetchAsyncGetProject());
        await dispatch(fetchAsyncGetTaskCategory());
        await dispatch(fetchAsyncGetTasks());
        await dispatch(fetchAsycnGetInvite());
      } else {
        localStorage.removeItem('localJWT');
        history.push('/login');
      }
    };
    fetchBootRoader();
  }, []);
}
