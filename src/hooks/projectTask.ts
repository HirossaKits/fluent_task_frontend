import { useSelector } from "react-redux"
import { selectSelectedProjectId } from "../features/proj/projectSlice"
import { selectTasks } from "../features/task/taskSlice"

const useProjectTask = () => {
  const projectId = useSelector(selectSelectedProjectId);
  const tasks = useSelector(selectTasks)
  return tasks.filter(task => task.project_id === projectId)
}

export default useProjectTask