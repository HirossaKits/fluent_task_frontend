import React from 'react';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CommonTextField from '../../components/CommonTextField';
import CommonMultiSelect from '../../components/CommonMultiSelect';
import CommonDatePicker from '../../components/CommonDatePicker';
import CommonDialog from '../../components/CommonDialog';
import { selectOrgUser } from '../org/orgSliece';
import {
  selectEditedProject,
  selectProjectDialogOpen,
  setProject,
  setEditedProject,
  setProjectDialogOpen,
} from '../proj/projectSlice';
import useCreateOption from '../../hooks/optionCreater';
import { TARGET } from '../types';

const ProjectDialog = () => {
  const theme = useTheme();
  const styles = {
    form: css`
      margin: 0 ${theme.spacing(5)};
    `,
    title: css`
      margin-left: ${theme.spacing(3)};
    `,
    close: css`
      margin: 10px;
    `,
    arrow: css`
      margin: 20px 28px 0 36px;
      color: ${theme.palette.action.active};
    `,
  };

  const dispatch = useDispatch();
  const createOption = useCreateOption();
  const projectDialogOpen = useSelector(selectProjectDialogOpen);
  const orgUser = useSelector(selectOrgUser);
  const userOptions = createOption(orgUser, 'user_id', [
    'last_name',
    'first_name',
  ]);
  const editedProject = useSelector(selectEditedProject);

  const editedRespOptions = createOption(
    orgUser.filter((user) => editedProject.resp_id.includes(user.user_id)),
    'user_id',
    ['last_name', 'first_name']
  );

  const editedMemberOptions = createOption(
    orgUser.filter((user) => editedProject.member_id.includes(user.user_id)),
    'user_id',
    ['last_name', 'first_name']
  );

  const handleInputChange = (target: TARGET) => {
    dispatch(
      setEditedProject({ ...editedProject, [target.name]: target.value })
    );
    console.log('target', target);
  };

  const handleClose = () => {
    dispatch(setProjectDialogOpen(false));
  };

  const handleRegisterClick = () => {
    dispatch(setProject(editedProject));
    dispatch(setProjectDialogOpen(false));
  };

  return (
    <CommonDialog
      open={projectDialogOpen}
      title='プロジェクトを編集'
      onClose={handleClose}
      maxWidth='sm'
      type='input'
    >
      <Stack
        direction='column'
        justifyContent='flex-start'
        alignItems='flex-start'
      >
        <CommonTextField
          label='プロジェクト名'
          name='project_name'
          value={editedProject.project_name}
          onChange={handleInputChange}
          width='50%'
        />
        <CommonTextField
          label='説明'
          name='description'
          value={editedProject.description}
          onChange={handleInputChange}
          width='100%'
        />
        <CommonMultiSelect
          label='プロジェクト管理者'
          name='resp_id'
          options={userOptions}
          value={editedRespOptions}
          onChange={handleInputChange}
        />
        <CommonMultiSelect
          label='プロジェクトメンバー'
          name='member_id'
          options={userOptions}
          value={editedMemberOptions}
          onChange={handleInputChange}
        />
        <Stack direction='row' justifyContent='flex-start' alignItems='center'>
          <CommonDatePicker
            label='開始日'
            name='scheduled_endate'
            value={editedProject.startdate}
            onChange={handleInputChange}
          />
          <SwapHorizIcon css={styles.arrow} />
          <CommonDatePicker
            label='終了日'
            name='scheduled_endate'
            value={editedProject.enddate}
            onChange={handleInputChange}
          />
        </Stack>
      </Stack>
    </CommonDialog>
  );
};

export default ProjectDialog;
