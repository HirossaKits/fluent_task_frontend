import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectOrgInfo } from '../features/org/orgSliece';
import { USER_INFO } from '../features/types';

export default function useSortUser() {
  const orgInfo = useSelector(selectOrgInfo);
  return useCallback((users: USER_INFO[]) => {
    const sorted = users.slice();
    sorted.sort((a, b) => {
      if (a.user_id === orgInfo.org_owner_id) return -1;
      if (b.user_id === orgInfo.org_owner_id) return 1;
      if (orgInfo.org_admin_id.includes(a.user_id)) return -1;
      if (orgInfo.org_admin_id.includes(b.user_id)) return 1;
      return 1;
    });
    return sorted;
  }, []);
}
