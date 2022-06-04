import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';
import { Line, Doughnut } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import * as colorHandler from '../../util/colorHandler';
import { AppDispatch } from '../../app/store';
import { EDITED_PROJECT } from '../types';
import useSortUser from '../../hooks/sortUser';
import useCreateLineChartData from '../../hooks/lineChartData';
import useCreateDoughnutData from '../../hooks/doughnutData';
import {
  emptyProject,
  fetchAsyncDeleteProject,
  selectSelectedProject,
  setEditedProject,
  setProjectDialogOpen,
  setProjectDialogMode,
} from './projectSlice';
import {
  fetchAsyncGetTaskCategory,
  fetchAsyncGetTasks,
  selectTasks,
} from '../task/taskSlice';
import CommonAvatar from '../../components/CommonAvatar';
import CommonTooltip from '../../components/CommonTooltip';
import ProjectDialog from './ProjectDialog';

const Project = () => {
  const theme = useTheme();
  const styles = {
    stack: css`
      margin-bottom: 24px;
      margin-right: 20px;
    `,
    titleWrap: css`
      display: flex;
      align-items: center;
    `,
    editIcon: css`
      margin-left: 24px;
    `,
    description: css`
      margin-top: ${theme.spacing(2)};
      margin-bottom: 10px;
    `,
    userCard: css`
      margin: ${theme.spacing(2)} 0;
      width: 320px;
      text-align: left;
    `,
    respList: css`
      max-height: 160px;
      overflow: hidden visible;
    `,
    memberList: css`
      max-height: 298px;
      overflow: hidden visible;
    `,
    listTitle: css`
      margin: 10px 20px;
    `,
    graphArea: css`
      width: 100%;
    `,
    lineChartWrapper: css`
      width: 85%;
      min-width: 580px;
      margin-top: 30px;
      margin-left: auto;
      margin-right: auto;
    `,
    lineChart: css`
      max-height: 35vh;
    `,
    doughnutWrapper: css`
      width: 45%;
      min-width: 290px;
      max-height: 35vh;
      margin-top: 50px;
      margin-left: auto;
      margin-right: auto;
    `,
    doughnut: css`
      max-height: 40vh;
    `,
  };

  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const sortUser = useSortUser();
  const createLineChartData = useCreateLineChartData();
  const createDoughnutData = useCreateDoughnutData();
  const project = useSelector(selectSelectedProject);
  const tasks = useSelector(selectTasks);
  const lineChartData = createLineChartData(
    tasks,
    project.startdate,
    project.enddate,
    'daily'
  );

  const deleteProjectBootLoader = async () => {
    const res = await dispatch(fetchAsyncDeleteProject());
    if (fetchAsyncDeleteProject.fulfilled.match(res)) {
      await dispatch(fetchAsyncGetTaskCategory());
      await dispatch(fetchAsyncGetTasks());
    }
  };

  const doughnutData = createDoughnutData(tasks);

  const lineData = {
    labels: lineChartData.length ? lineChartData.map((data) => data.label) : [],
    datasets: [
      {
        label: t('project.progress'),
        data: lineChartData?.map((data) => data.percent),
        lineTension: 0.1,
        backgroundColor: colorHandler.convertColorCodeToRGBA(
          theme.palette.primary.main,
          0.2
        ),
        borderColor: colorHandler.convertColorCodeToRGBA(
          theme.palette.primary.main
        ),
        fill: true,
      },
    ],
  };

  const lineOption = {
    scales: {
      y: {
        max: 100,
        min: 0,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  const dataDoughnut = {
    labels: doughnutData.map((data) => data.label),
    datasets: [
      {
        data: doughnutData.map((data) => data.value),

        backgroundColor: [
          colorHandler.convertColorCodeToRGBA(theme.palette.success.light, 0.2),
          colorHandler.convertColorCodeToRGBA(theme.palette.info.light, 0.2),
          colorHandler.convertColorCodeToRGBA(theme.palette.warning.light, 0.2),
          colorHandler.convertColorCodeToRGBA(theme.palette.grey[400], 0.2),
        ],
        borderColor: [
          colorHandler.convertColorCodeToRGBA(theme.palette.success.light),
          colorHandler.convertColorCodeToRGBA(theme.palette.info.light),
          colorHandler.convertColorCodeToRGBA(theme.palette.warning.light),
          colorHandler.convertColorCodeToRGBA(theme.palette.grey[400]),
        ],
      },
    ],
  };

  const handleEditClick = () => {
    const initEditeProject: EDITED_PROJECT = {
      project_id: project.project_id,
      project_name: project.project_name,
      resp_id: project.resp.map((user) => user.user_id),
      member_id: project.member.map((user) => user.user_id),
      description: project.description,
      startdate: project.startdate,
      enddate: project.enddate,
    };
    dispatch(setProjectDialogMode('edit'));
    dispatch(setEditedProject(initEditeProject));
    dispatch(setProjectDialogOpen(true));
  };

  const handleDeleteClick = () => {
    deleteProjectBootLoader();
  };

  return (
    <>
      {!Object.is(project, emptyProject) && (
        <>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={3}
          >
            <Stack
              css={styles.stack}
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Box css={styles.titleWrap}>
                <Typography variant="h5" component="div">
                  {project.project_name}
                </Typography>
                <CommonTooltip title={t('project.edit')}>
                  <IconButton
                    aria-label="edit project"
                    css={styles.editIcon}
                    onClick={handleEditClick}
                  >
                    <EditIcon />
                  </IconButton>
                </CommonTooltip>
                <CommonTooltip title={t('project.delete')}>
                  <IconButton
                    disabled={
                      project.project_id ===
                      'ae487b73-f1d9-400d-943f-f834e2869f26'
                    }
                    aria-label="delete project"
                    onClick={handleDeleteClick}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CommonTooltip>
              </Box>
              <Typography
                css={styles.description}
                variant="subtitle1"
                component="div"
                align="left"
              >
                {project.description}
              </Typography>
              <Card css={styles.userCard}>
                <Typography
                  css={styles.listTitle}
                  variant="subtitle1"
                  component="div"
                >
                  {t('project.admin')}
                </Typography>
                <Divider />
                <List css={styles.respList} dense>
                  {sortUser(project.resp)?.map((user, idx) => (
                    <ListItem key={idx} disablePadding>
                      <ListItemButton>
                        <ListItemAvatar>
                          <CommonAvatar user={user} />
                        </ListItemAvatar>
                        {/* <ListItemText
                          primary={`${user.last_name} ${user.first_name}`}
                        /> */}
                        <Typography>
                          {`${user.last_name} ${user.first_name}`}
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Card>
              <Card css={styles.userCard}>
                <Typography
                  css={styles.listTitle}
                  variant="subtitle1"
                  component="div"
                >
                  {t('project.member')}
                </Typography>
                <Divider />
                <List css={styles.memberList} dense>
                  {sortUser(project.member).map((user, idx) => (
                    <ListItem key={idx} disablePadding>
                      <ListItemButton>
                        <ListItemAvatar>
                          <CommonAvatar user={user} />
                        </ListItemAvatar>
                        {/* <ListItemText
                          primary={`${user.last_name} ${user.first_name}`}
                        /> */}
                        <Typography>
                          {`${user.last_name} ${user.first_name}`}
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Stack>
            <Stack
              css={styles.graphArea}
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
            >
              <div css={styles.lineChartWrapper}>
                <Line
                  css={styles.lineChart}
                  data={lineData}
                  options={lineOption}
                />
              </div>
              <div css={styles.doughnutWrapper}>
                <Doughnut css={styles.doughnut} data={dataDoughnut} />
              </div>
            </Stack>
          </Stack>
          <ProjectDialog />
        </>
      )}
    </>
  );
};

export default Project;
