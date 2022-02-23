import { useSelector } from 'react-redux';
import { selectOrgInfo } from '../features/org/orgSliece';
import { selectProjectRespId } from '../features/proj/projectSlice';

const useProjectResp = () => {
  const orgInfo = useSelector(selectOrgInfo);
  const respId = useSelector(selectProjectRespId);

  const projectResp = orgInfo.org_user?.filter((user) =>
    respId?.includes(user.user_id)
  );
  return projectResp;
};

export default useProjectResp;
