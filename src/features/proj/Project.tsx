import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Line, Doughnut } from 'react-chartjs-2';
import EditIcon from '@mui/icons-material/Edit';
import CommonTooltip from '../../components/CommonTooltip';
import * as colorHandler from '../../util/colorHandler';
import {
  selectSelectedProject,
  setEditedProject,
  setProjectDialogOpen,
  setProjectDialogMode,
} from './projectSlice';
import ProjectDialog from './ProjectDialog';
import useProjectMember from '../../hooks/projectMember';
import useProjectResp from '../../hooks/projectResp';
import useProjectTask from '../../hooks/projectTask';
import useCreateLineChartData from '../../hooks/lineChartData';
import useCreateDoughnutData from '../../hooks/doughnutData';

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
    titleText: css`
      padding-bottom: 2px;
    `,
    editIcon: css`
      margin-left: 16px;
    `,
    userCard: css`
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

  const dispatch = useDispatch();
  const createLineChartData = useCreateLineChartData();
  const createDoughnutData = useCreateDoughnutData();
  const tasks = useProjectTask();
  const project = useSelector(selectSelectedProject);
  const projectMember = useProjectMember();
  const projectResp = useProjectResp();
  const lineChartData = createLineChartData(
    tasks,
    project.startdate,
    project.enddate,
    'daily'
  );
  const doughnutData = createDoughnutData(tasks);

  const lineData = {
    labels: lineChartData.map((data) => data.label),
    datasets: [
      {
        label: '進捗(%)',
        data: lineChartData.map((data) => data.percent),
        lineTension: 0,
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
          colorHandler.convertColorCodeToRGBA(theme.palette.success.light, 0.4),
          colorHandler.convertColorCodeToRGBA(theme.palette.info.light, 0.4),
          colorHandler.convertColorCodeToRGBA(theme.palette.warning.light, 0.4),
          colorHandler.convertColorCodeToRGBA(theme.palette.grey[400], 0.4),
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
    dispatch(setProjectDialogMode('edit'));
    dispatch(setEditedProject(project));
    dispatch(setProjectDialogOpen(true));
  };

  return (
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
          spacing={3}
        >
          <Box css={styles.titleWrap}>
            <Typography css={styles.titleText} variant="h5" component="div">
              {project?.project_name}
            </Typography>
            <CommonTooltip title="編集">
              <IconButton css={styles.editIcon} onClick={handleEditClick}>
                <EditIcon fontSize="small" />
              </IconButton>
            </CommonTooltip>
          </Box>
          <Typography variant="subtitle1" component="div">
            {project?.description}
          </Typography>
          <Card css={styles.userCard}>
            <Typography
              css={styles.listTitle}
              variant="subtitle1"
              component="div"
            >
              プロジェクト管理者
            </Typography>
            <Divider />
            <List css={styles.respList} dense>
              {projectResp?.map((user) => (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemAvatar>
                      {user.avatar_img ? (
                        <Avatar src={user.avatar_img} />
                      ) : (
                        <Avatar>
                          {user.last_name.slice(0, 1) +
                            user.first_name.slice(0, 1)}
                        </Avatar>
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${user.last_name} ${user.first_name}`}
                    />
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
              プロジェクトメンバー
            </Typography>
            <Divider />
            <List css={styles.memberList} dense>
              {projectMember?.map((user) => (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemAvatar>
                      {user.avatar_img ? (
                        <Avatar src={user.avatar_img} />
                      ) : (
                        <Avatar>
                          {user.last_name.slice(0, 1) +
                            user.first_name.slice(0, 1)}
                        </Avatar>
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${user.last_name} ${user.first_name}`}
                    />
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
            <Line css={styles.lineChart} data={lineData} options={lineOption} />
          </div>
          <div css={styles.doughnutWrapper}>
            <Doughnut css={styles.doughnut} data={dataDoughnut} />
          </div>
        </Stack>
      </Stack>
      <ProjectDialog />
    </>
  );
};

export default Project;
