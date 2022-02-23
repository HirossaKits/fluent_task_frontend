import { useSelector } from 'react-redux';
import { selectOrgInfo } from '../features/org/orgSliece';
import { selectProjectMemberId } from '../features/proj/projectSlice';

const useProjectMember = () => {
  const orgInfo = useSelector(selectOrgInfo);
  const memberId = useSelector(selectProjectMemberId);

  const projectMember = orgInfo.org_user?.filter((user) =>
    memberId?.includes(user.user_id)
  );
  return projectMember;
};

export default useProjectMember;
