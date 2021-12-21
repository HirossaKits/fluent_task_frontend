import React from 'react';
import { css } from '@emotion/react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Line, Doughnut } from 'react-chartjs-2';

const lineData = {
  labels: ['2021-11', '2021-12', '2021-01', '2021-02', '2021-03', '2021-03'],
  datasets: [
    {
      label: '進捗',
      data: [5, 7, 9, 10, 16, 20],
      lineTension: 0.2,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      fill: true,
    },
  ],
};

const dataDoughnut = {
  labels: ['完了', '未完了'],
  datasets: [
    {
      data: [70, 30],

      backgroundColor: ['rgba(75,192,192,0.2)', 'rgba(192,192,192,0.2)'],
      borderColor: ['rgba(75,192,192,1)', 'rgba(192,192,192,1)'],
    },
  ],
};

const Project = () => {
  const styles = {
    stack: css`
      margin-bottom: 24px;
      margin-right: 20px;
    `,
    userCard: css`
      width: 320px;
      text-align: left;
    `,
    respList: css`
      max-height: 156px;
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
    lineChart: css`
      width: 85%;
      min-width: 580px;
      margin-top: 30px;
      margin-left: auto;
      margin-right: auto;
    `,
    doughnut: css`
      width: 45%;
      min-width: 290px;
      margin-top: 50px;
      margin-left: auto;
      margin-right: auto;
    `,
  };

  return (
    <>
      <Stack
        direction='row'
        justifyContent='flex-start'
        alignItems='flex-start'
        spacing={3}
      >
        <Stack
          css={styles.stack}
          direction='column'
          justifyContent='flex-start'
          alignItems='flex-start'
          spacing={3}
        >
          <Typography variant='h5' component='div'>
            This is a Sample Project
          </Typography>

          <Typography variant='subtitle1' component='div'>
            サンプルプロジェクトです。
          </Typography>

          <Card css={styles.userCard}>
            <Typography
              css={styles.listTitle}
              variant='subtitle1'
              component='div'
            >
              プロジェクト管理者
            </Typography>
            <Divider />
            <List css={styles.respList} dense>
              {[...Array(10)].map(() => (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText primary={'HELLO!'} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Card>
          <Card css={styles.userCard}>
            <Typography
              css={styles.listTitle}
              variant='subtitle1'
              component='div'
            >
              プロジェクトメンバー
            </Typography>
            <Divider />
            <List css={styles.memberList} dense>
              {[...Array(10)].map(() => (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText primary={'HELLO!'} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Card>
        </Stack>
        <Stack
          css={styles.graphArea}
          direction='column'
          justifyContent='center'
          alignItems='flex-start'
        >
          <div css={styles.lineChart}>
            <Line data={lineData} />
          </div>
          <div css={styles.doughnut}>
            <Doughnut data={dataDoughnut} />
          </div>
        </Stack>
      </Stack>
    </>
  );
};

export default Project;
