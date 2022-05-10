import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import CommonTextField from '../../components/CommonTextField';
import CommonTooltip from '../../components/CommonTooltip';
import { TARGET } from '../types';
import {
  fetchAsyncDeleteTaskCategory,
  fetchAsyncUpdateTaskCategory,
} from '../task/taskSlice';
import { useTranslation } from 'react-i18next';

export type Props = {
  task_category_id: string;
  task_category_name: string;
};

const TaskCategoryItem: React.FC<Props> = (props) => {
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
  const { t } = useTranslation();
  const [edited, setEdited] = useState(props.task_category_name);

  const handleChange = (target: TARGET) => {
    setEdited(String(target.value));
  };

  const handleEditClick = () => {
    const data = {
      task_category_id: props.task_category_id,
      task_category_name: edited,
    };
    dispatch(fetchAsyncUpdateTaskCategory(data));
  };

  const handleDeleteClick = () => {
    dispatch(fetchAsyncDeleteTaskCategory(props.task_category_id));
  };

  return (
    <Stack direction="row" justifyContent="flex-start">
      <CommonTextField
        name={props.task_category_id}
        value={edited}
        onChange={handleChange}
        width="260px"
      />
      <Box css={styles.span}></Box>
      {edited && props.task_category_name !== edited && (
        <Box css={styles.icon}>
          <CommonTooltip title={t('taskCategoryDialog.save')}>
            <IconButton aria-label="edit task" onClick={handleEditClick}>
              <CheckIcon />
            </IconButton>
          </CommonTooltip>
        </Box>
      )}
      <Box css={styles.icon}>
        <CommonTooltip title={t('taskCategoryDialog.delete')}>
          <IconButton aria-label="delete task" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </CommonTooltip>
      </Box>
    </Stack>
  );
};

export default TaskCategoryItem;
