import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { TARGET } from '../types';
import {
  selectLoginUserInfo,
  selectEditedProf,
  setEditedProf,
  fetchAsyncUpdateProf,
} from '../auth/authSlice';
import { setProfileDialogOpen, selectProfileDialogOpen } from './mainSlice';
import CommonTextField from '../../components/CommonTextField';
import CommonToolTip from '../../components/CommonTooltip';

const ProfileDialog = () => {
  const theme = useTheme();
  const styles = {
    wrap: css`
      position: relative;
    `,
    form: css`
      width: 100%;
    `,
    title: css`
      margin-left: ${theme.spacing(3)};
    `,
    close: css`
      position: absolute;
      top: 10px;
      right: 10px;
    `,
    stack: css`
      text-align: center;
    `,
    avatar: css`
      width: 160px;
      height: 160px;
      font-size: 36px;
    `,
    badge: css`
      margin-top: 30px;
      margin-left: 30px;
    `,
  };

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const loginUserInfo = useSelector(selectLoginUserInfo);
  const editedProf = useSelector(selectEditedProf);
  const profileDialogOpen = useSelector(selectProfileDialogOpen);
  const [previewImg, setPreviewImg] = useState('');
  const [uploadFile, setUploadFile] = useState(null);

  useEffect(() => {
    const { first_name, last_name, comment } = loginUserInfo;
    dispatch(setEditedProf({ first_name, last_name, comment }));
    setPreviewImg('');
    setUploadFile(null);
  }, [profileDialogOpen]);

  const handleInputChange = (target: TARGET) => {
    dispatch(setEditedProf({ ...editedProf, [target.name]: target.value }));
  };

  const handleRegisterClick = () => {
    dispatch(fetchAsyncUpdateProf(uploadFile));
    dispatch(setProfileDialogOpen(false));
  };

  const handleClose = () => {
    dispatch(setProfileDialogOpen(false));
    setTimeout(() => {
      dispatch(setEditedProf({ ...editedProf, upload_file: null }));
      setPreviewImg('');
    }, 100);
  };

  const handlePictureClick = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput?.click();
  };

  const handleOnFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setUploadFile(file);
        setPreviewImg(String(reader.result));
      };
    }
  };

  return (
    <>
      <Dialog
        open={profileDialogOpen}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        maxWidth='xs'
        fullWidth
      >
        <Grid css={styles.title} item>
          <DialogTitle>プロフィールを編集</DialogTitle>
        </Grid>
        <Grid css={styles.close} item>
          <IconButton size='small' onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <form css={styles.form} noValidate autoComplete='off'>
          <Stack direction='column' justifyContent='center' alignItems='center'>
            <input
              type='file'
              id='imageInput'
              hidden={true}
              onChange={(e) => handleOnFileChange(e)}
            />
            <Badge
              overlap='circular'
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <CommonToolTip title={t('profileDialog.editProfile')}>
                  <IconButton css={styles.badge} onClick={handlePictureClick}>
                    <CameraAltIcon />
                  </IconButton>
                </CommonToolTip>
              }
            >
              <Avatar
                css={styles.avatar}
                src={previewImg ? previewImg : loginUserInfo.avatar_img}
              />
            </Badge>
            <CommonTextField
              label={t('profileDialog.firstName')}
              name='last_name'
              value={editedProf.last_name}
              onChange={handleInputChange}
              width='200px'
            />
            <CommonTextField
              label={t('profileDialog.lastName')}
              name='first_name'
              value={editedProf.first_name}
              onChange={handleInputChange}
              width='200px'
            />
            <CommonTextField
              label={t('profileDialog.comment')}
              name='comment'
              value={editedProf.comment}
              onChange={handleInputChange}
              width='200px'
            />
          </Stack>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              キャンセル
            </Button>
            <Button onClick={handleRegisterClick} color='primary'>
              登録
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ProfileDialog;
