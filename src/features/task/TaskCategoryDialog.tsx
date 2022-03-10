import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CommonDialog from '../../components/CommonDialog';
import CommonTextField from '../../components/CommonTextField';
import { selectSelectedProject } from '../proj/projectSlice';
import CommonTooltip from '../../components/CommonTooltip';

type Props = {
  open: boolean;
  setOpen: (oepn: boolean) => void;
};

const TaskCategoryDialog = (props: Props) => {
  const styles = {
    icon: css`
      margin-top: 12px;
    `,
  };

  const selectedProject = useSelector(selectSelectedProject);
  const [editedCategory, setEditedCategory] = useState(
    selectedProject.task_category
  );

  const handleEditClick = () => {};

  const handleDeleteClick = () => {};

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <CommonDialog
      open={props.open}
      onClose={handleClose}
      title="カテゴリを編集"
      mode="display"
      maxWidth="xs"
    >
      <>
        {editedCategory?.map((cat) => (
          <Stack direction="row">
            <CommonTextField
              name={cat.task_category_id}
              value={cat.task_category_name}
            />
            <Box css={styles.icon}>
              <CommonTooltip title="編集">
                <IconButton aria-label="edit task" onClick={handleEditClick}>
                  <EditIcon />
                </IconButton>
              </CommonTooltip>
            </Box>
            <Box css={styles.icon}>
              <CommonTooltip title="削除">
                <IconButton
                  aria-label="delete task"
                  onClick={handleDeleteClick}
                >
                  <DeleteIcon />
                </IconButton>
              </CommonTooltip>
            </Box>
          </Stack>
        ))}
      </>
    </CommonDialog>
  );
};

export default TaskCategoryDialog;
