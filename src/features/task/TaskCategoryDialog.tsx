import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { TARGET } from '../types';
import TaskCategoryItem from './TaskCategoryItem';
import { selectSelectedProjectId } from '../proj/projectSlice';
import {
  selectTaskCategory,
  fetchAsyncRegisterTaskCategory,
} from '../task/taskSlice';
import CommonDialog from '../../components/CommonDialog';
import CommonTextField from '../../components/CommonTextField';
import CommonTooltip from '../../components/CommonTooltip';

type Props = {
  open: boolean;
  setOpen: (oepn: boolean) => void;
};

const TaskCategoryDialog = (props: Props) => {
  const styles = {
    icon: css`
      margin-top: 12px;
      width: 40px;
    `,
    span: css`
      margin-left: 12px;
    `,
  };

  const dispatch = useDispatch();
  const selectedProjectId = useSelector(selectSelectedProjectId);
  const taskCategory = useSelector(selectTaskCategory);
  const [addedCategory, setAddedCategory] = useState('');

  const handleAddChange = (target: TARGET) => {
    setAddedCategory(target.value?.toString() ?? '');
  };

  const handleAddClick = (event: React.MouseEvent<HTMLElement>) => {
    const data = {
      task_category_name: addedCategory,
      project_id: selectedProjectId,
    };
    dispatch(fetchAsyncRegisterTaskCategory(data));
    setAddedCategory('');
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <CommonDialog
      open={props.open}
      onClose={handleClose}
      title='カテゴリー設定'
      mode='display'
      maxWidth='xs'
    >
      <>
        <Stack direction='row' justifyContent='flex-start'>
          <CommonTextField
            name=''
            value={addedCategory}
            onChange={handleAddChange}
            width='260px'
          />
          <Box css={styles.span}></Box>
          <Box css={styles.icon}>
            <CommonTooltip title='追加'>
              <IconButton
                aria-label='delete task'
                onClick={handleAddClick}
                disabled={
                  !addedCategory ||
                  taskCategory
                    ?.map((cat) => cat.task_category_name)
                    .includes(addedCategory)
                }
              >
                <AddIcon />
              </IconButton>
            </CommonTooltip>
          </Box>
        </Stack>
        {taskCategory?.map((cat) => (
          <TaskCategoryItem
            task_category_id={cat.task_category_id}
            task_category_name={cat.task_category_name}
          />
        ))}
      </>
    </CommonDialog>
  );
};

export default TaskCategoryDialog;
