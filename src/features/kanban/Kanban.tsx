import React from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import { selectTasks } from '../task/taskSlice';
import KanbanColumn from './KanbanColumn';
import TaskDialog from '../task/TaskDialog';

const Kanban = () => {
  const theme = useTheme();
  const styles = {
    container: css`
      display: flex;
      justify-content: space-evenly;
      margin-top: ${theme.spacing(4)};
    `,
    column: css`
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      width: 29%;
      height: 83vh;
      background-color: ${theme.palette.action.hover};
    `,
    header: css`
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6px 36px 4px 0px;
    `,
    divider: css`
      margin-bottom: ${theme.spacing(1)};
    `,
    card: css`
      display: flex;
      justify-content: space-between;
      height: ${theme.spacing(7)};
      margin-top: ${theme.spacing(1)};
      margin-bottom: ${theme.spacing(1)};
      margin-left: ${theme.spacing(2)};
      margin-right: ${theme.spacing(2)};
    `,
    boxTitle: css`
      display: flex;
      flex-grow: 1;
      flex-wrap: nowrap;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      margin-left: 15px;
    `,
    boxStatus: css`
      min-width: 45px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: end;
      margin-left: 10px;
    `,
    boxDot: css`
      display: flex;
      flex-direction: column;
      justify-content: center;
    `,
    userCard: css`
      width: 320px;
      text-align: left;
    `,
    listTitle: css`
      margin: 10px 20px;
    `,
  };

  const tasks = useSelector(selectTasks);

  return (
    <>
      <div css={styles.container}>
        <KanbanColumn
          themeColor={theme.palette.text.disabled}
          status="Suspended"
          headerText="保留"
          tasks={tasks.filter((task) => task.status === 'Suspended')}
        />
        <KanbanColumn
          themeColor={theme.palette.warning.light}
          status="Not started"
          headerText="開始前"
          tasks={tasks.filter((task) => task.status === 'Not started')}
        />
        <KanbanColumn
          themeColor={theme.palette.info.light}
          status="On going"
          headerText="進行中"
          tasks={tasks.filter((task) => task.status === 'On going')}
        />
        <KanbanColumn
          themeColor={theme.palette.success.light}
          status="Done"
          headerText="完了"
          tasks={tasks.filter((task) => task.status === 'Done')}
        />
        <TaskDialog />
      </div>
    </>
  );
};

export default Kanban;
