import { useSelector } from 'react-redux'
import { selectOrgUser } from '../features/org/orgSliece'
import { selectProjectRespId } from '../features/proj/projectSlice'

const useProjectResp = () => {

  const orgUser = useSelector(selectOrgUser)
  const respId = useSelector(selectProjectRespId)

  const projectResp = orgUser.filter((user) => respId?.includes(user.user_id))
  return projectResp
}

export default useProjectResp