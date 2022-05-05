import { useDispatch } from 'react-redux';
import { initAuthState } from '../features/auth/authSlice';
import { initCalendarState } from '../features/calendar/calendarSlice';
import { initKanbanState } from '../features/kanban/kanbanSlice';
import { initMainState } from '../features/main/mainSlice';
import { initOrgState } from '../features/org/orgSliece';
import { initProjectState } from '../features/proj/projectSlice';
import { initTaskState } from '../features/task/taskSlice';

export default function useInitalizeState() {
  const dispatch = useDispatch();
  return () => {
    console.log('why');
    dispatch(initMainState('Org'));
    dispatch(initAuthState({}));
    dispatch(initOrgState({}));
    dispatch(initProjectState({}));
    dispatch(initTaskState({}));
    dispatch(initKanbanState({}));
    dispatch(initCalendarState({}));
  };
}
