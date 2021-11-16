import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ToolTip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
  selectLoginUserCred,
  selectLoginUserProf,
  selectEditedProf,
  setEditedProf,
  fetchAsyncUpdateProf,
} from "../auth/authSlice";
import { setProfileDialogOpen, selectProfileDialogOpen } from "./mainSlice";
import CommonTextField from "../../common/CommonTextField";
import { TARGET } from "../types";

const ProfileDialog = () => {
  const dispatch = useDispatch();
  const loginUserProf = useSelector(selectLoginUserProf);
  const editedProf = useSelector(selectEditedProf);
  const profileDialogOpen = useSelector(selectProfileDialogOpen);
  const [previewImg, setPreviewImg] = useState("");

  useEffect(() => {
    dispatch(
      setEditedProf({
        ...loginUserProf,
        upload_file: null,
      })
    );
  }, [profileDialogOpen]);

  const handleInputChange = (target: TARGET) => {
    dispatch(setEditedProf({ ...editedProf, [target.name]: target.value }));
  };

  const handleRegisterClick = () => {
    dispatch(fetchAsyncUpdateProf(editedProf));
    dispatch(setProfileDialogOpen(false));
  };

  const handleClose = () => {
    dispatch(setProfileDialogOpen(false));
    setTimeout(() => {
      dispatch(setEditedProf({ ...editedProf, upload_file: null }));
      setPreviewImg("");
    }, 100);
  };

  const handlePictureClick = () => {
    const fileInput = document.getElementById("imageInput");
    console.log(fileInput);
    fileInput?.click();
  };

  const handleOnFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        dispatch(setEditedProf({ ...editedProf, upload_file: file }));
        setPreviewImg(reader.result as string);
      };
    }
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
    badge: css`
      margin-top: 30px;
      margin-left: 30px;
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
            <input
              type='file'
              id='imageInput'
              hidden={true}
              onChange={(e) => handleOnFileChange(e)}
            />
            <Badge
              overlap='circular'
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <ToolTip title='画像をアップロード'>
                  <IconButton css={styles.badge} onClick={handlePictureClick}>
                    <CameraAltIcon />
                  </IconButton>
                </ToolTip>
              }
            >
              <Avatar
                css={styles.avatar}
                src={previewImg ? previewImg : loginUserProf.avatar_img}
              />
            </Badge>
            <CommonTextField
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
