import React from 'react';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { TARGET } from '../types';
import useCreateOption from '../../hooks/optionCreater';
import { selectOrgInfo } from '../org/orgSliece';
import {
  fetchAsyncRegisterProject,
  fetchAsyncUpdateProject,
  selectEditedProject,
  selectProjectDialogOpen,
  selectProjectDialogMode,
  setEditedProject,
  setProjectDialogOpen,
  setTaskCategory,
} from '../proj/projectSlice';

import { setTasks } from '../task/taskSlice';
import CommonTextField from '../../components/CommonTextField';
import CommonMultiSelect from '../../components/CommonMultiSelect';
import CommonDatePicker from '../../components/CommonDatePicker';
import CommonDialog from '../../components/CommonDialog';

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
  const projectDialogMode = useSelector(selectProjectDialogMode);
  const orgInfo = useSelector(selectOrgInfo);
  const userOptions = createOption(orgInfo.org_user, 'user_id', [
    'last_name',
    'first_name',
  ]);
  const editedProject = useSelector(selectEditedProject);

  const handleInputChange = (target: TARGET) => {
    dispatch(
      setEditedProject({ ...editedProject, [target.name]: target.value })
    );
  };

  const handleClose = () => {
    dispatch(setProjectDialogOpen(false));
  };

  const handleRegisterClick = () => {
    dispatch(fetchAsyncRegisterProject());
    dispatch(setTasks([]));
    dispatch(setTaskCategory([]));
    dispatch(setProjectDialogOpen(false));
  };

  const handleEditClick = () => {
    dispatch(fetchAsyncUpdateProject());
    dispatch(setProjectDialogOpen(false));
  };

  return (
    <CommonDialog
      open={projectDialogOpen}
      title={
        projectDialogMode === 'register'
          ? 'プロジェクトを作成'
          : 'プロジェクトを編集'
      }
      onClose={handleClose}
      onRegister={handleRegisterClick}
      onEdit={handleEditClick}
      // onDelete={handleDeleteClick}
      maxWidth="sm"
      mode={projectDialogMode}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <CommonTextField
          label="プロジェクト名"
          name="project_name"
          value={editedProject.project_name}
          onChange={handleInputChange}
          width="50%"
        />
        <CommonTextField
          label="説明"
          name="description"
          value={editedProject.description}
          onChange={handleInputChange}
          width="100%"
        />
        <CommonMultiSelect
          label="プロジェクト管理者"
          name="resp_id"
          options={userOptions}
          value={editedProject.resp_id}
          onChange={handleInputChange}
        />
        <CommonMultiSelect
          label="プロジェクトメンバー"
          name="member_id"
          options={userOptions}
          value={editedProject.member_id}
          onChange={handleInputChange}
        />
        <Stack direction="row" justifyContent="flex-start" alignItems="center">
          <CommonDatePicker
            label="開始日"
            name="startdate"
            value={editedProject.startdate}
            onChange={handleInputChange}
          />
          <SwapHorizIcon css={styles.arrow} />
          <CommonDatePicker
            label="終了日"
            name="enddate"
            value={editedProject.enddate}
            onChange={handleInputChange}
          />
        </Stack>
      </Stack>
    </CommonDialog>
  );
};

export default ProjectDialog;
