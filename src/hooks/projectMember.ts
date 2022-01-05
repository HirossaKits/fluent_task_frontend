import { useSelector } from 'react-redux'
import { selectOrgUser } from '../features/org/orgSliece'
import { selectProjectMemberId } from '../features/proj/projectSlice'

const useProjectMember = () => {

  const orgUser = useSelector(selectOrgUser)
  const memberId = useSelector(selectProjectMemberId)

  const projectMember = orgUser.filter((user) => memberId?.includes(user.user_id))
  return projectMember
}

export default useProjectMember