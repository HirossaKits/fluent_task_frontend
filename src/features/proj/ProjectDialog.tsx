import React from 'react';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {
  selectProjectDialogOpen,
  setProjectDialogOpen,
} from '../proj/projectSlice';
import CommonTextField from '../../components/CommonTextField';

const ProjectDialog = () => {
  const styles = {
    form: css`
      width: 100%;
    `,
  };

  const dispatch = useDispatch();
  const projectDialogOpen = useSelector(selectProjectDialogOpen);

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
      <DialogTitle>{'プロジェクトを編集'}</DialogTitle>
      {/* <Grid css={styles.title} item>
      <DialogTitle>プロフィールを編集</DialogTitle>
    </Grid>
    <Grid css={styles.close} item>
      <IconButton size='small' onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Grid> */}
      <form css={styles.form} noValidate autoComplete='off'>
        {/* <Stack direction='column' justifyContent='center' alignItems='center'> */}

        {/* <CommonTextField
          label='姓'
          name='last_name'
          value={editedProf.last_name}
          onChange={handleInputChange}
          width='200px'
        />
        <CommonTextField
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
        />
      </Stack> */}
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
