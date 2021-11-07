import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import {
  selectLoginUserProf,
  selectEditedProf,
  setEditedProf,
} from "../auth/authSlice";
import { setProfileDialogOpen, selectProfileDialogOpen } from "./mainSlice";
import CommonTextField from "../../common/CommonTextField";
import { TARGET } from "../types";

const ProfileDialog = () => {
  const dispatch = useDispatch();
  const profileDialogOpen = useSelector(selectProfileDialogOpen);
  const loginUserProf = useSelector(selectLoginUserProf);
  const editedProf = useSelector(selectEditedProf);

  const handleInputChange = (target: TARGET) => {
    dispatch(setEditedProf({ ...editedProf, [target.name]: target.value }));
  };

  const handleClose = () => {
    dispatch(setProfileDialogOpen(false));
  };

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
            <Avatar css={styles.avatar} src={loginUserProf.avatar_img} />
            <CommonTextField
              label='姓'
              name='last_name'
              value={loginUserProf.last_name}
              onChange={handleInputChange}
              width='200px'
            />
            <CommonTextField
              label='名'
              name='first_name'
              value={loginUserProf.first_name}
              onChange={handleInputChange}
              width='200px'
            />
            <CommonTextField
              label='コメント'
              name='comment'
              value={loginUserProf.comment}
              onChange={handleInputChange}
              width='200px'
            />
          </Stack>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              キャンセル
            </Button>
            <Button onClick={handleClose} color='primary'>
              登録
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ProfileDialog;
