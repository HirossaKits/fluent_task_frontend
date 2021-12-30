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
import {
  selectProjectDialogOpen,
  setProjectDialogOpen,
} from '../proj/projectSlice';
import CommonTextField from '../../components/CommonTextField';

const ProjectDialog = () => {
  const theme = useTheme();
  const styles = {
    header: css`
      display: ;
    `,
    form: css`
      width: 100%;
    `,
    title: css`
      margin-left: ${theme.spacing(3)};
    `,
    close: css`
      margin: 10px;
    `,
  };

  const dispatch = useDispatch();
  const projectDialogOpen = useSelector(selectProjectDialogOpen);

  console.log(projectDialogOpen);

  const handleClose = () => {
    dispatch(setProjectDialogOpen(false));
  };

  return (
    <Dialog
      open={projectDialogOpen}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
      maxWidth='xs'
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
        <Stack direction='column' justifyContent='center' alignItems='center'>
          <CommonTextField
            label='姓'
            name='last_name'
            // value={editedProf.last_name}
            // onChange={handleInputChange}
            width='200px'
          />
          {/* <CommonTextField
            label='名'
            name='first_name'
            value={editedProf.first_name}
            onChange={handleInputChange}
            width='200px'
          />
          <CommonTextField
            label='コメント'
            name='comment'
            value={editedProf.comment}
            onChange={handleInputChange}
            width='200px'
          /> */}
        </Stack>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            キャンセル
          </Button>
          <Button
            //  onClick={handleRegisterClick}
            color='primary'
          >
            登録
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProjectDialog;
