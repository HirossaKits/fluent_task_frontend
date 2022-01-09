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
import CommonTextField from '../../components/CommonTextField';
import CommonMultiSelect from '../../components/CommonMultiSelect';
import CommonDatePicker from '../../components/CommonDatePicker';
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
    header: css`
      display: ;
    `,
    form: css`
      margin: 0 ${theme.spacing(4)};
    `,
    title: css`
      margin-left: ${theme.spacing(3)};
    `,
    close: css`
      margin: 10px;
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
    <Dialog
      open={projectDialogOpen}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
      maxWidth='sm'
      fullWidth
    >
      <Stack direction='row' justifyContent='space-between'>
        <DialogTitle>プロジェクトを編集</DialogTitle>
        <Grid css={styles.close} item>
          <IconButton size='small' onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Stack>
      <form css={styles.form} noValidate autoComplete='off'>
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
            width='200px'
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
          <CommonDatePicker
            label='開始日'
            name='scheduled_endate'
            value={editedProject.startdate}
            onChange={handleInputChange}
          />
          <CommonDatePicker
            label='終了日'
            name='scheduled_endate'
            value={editedProject.enddate}
            onChange={handleInputChange}
          />
        </Stack>
      </form>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          キャンセル
        </Button>
        <Button onClick={handleRegisterClick} color='primary'>
          登録
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectDialog;
