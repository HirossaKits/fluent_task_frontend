import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import useMessage from '../../hooks/message';
import {
  selectInviteDialogOpen,
  selectEditedInviteMail,
  setInviteDialogOpen,
  setEditedInviteMail,
  fetchAsycnRegisterInvite,
} from './orgSliece';
import CommonDialog from '../../components/CommonDialog';

const InviteDialog = () => {
  const theme = useTheme();
  const styles = {
    iconbutton: css`
      color: inherit;
    `,
    iconbuttonFocus: css`
      color: ${theme.palette.primary.main};
    `,
  };

  const [focus, setFocus] = React.useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const message = useMessage();
  const inviteDialogOpen = useSelector(selectInviteDialogOpen);
  const editedInviteMail = useSelector(selectEditedInviteMail);

  const handleOnFocus = () => {
    setFocus(true);
  };
  const handleOnBlur = () => {
    setFocus(false);
  };

  const handleClose = () => {
    dispatch(setInviteDialogOpen(false));
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch(setEditedInviteMail(event.target.value));
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSendClick = () => {
    dispatch(fetchAsycnRegisterInvite(editedInviteMail));
    message(`${editedInviteMail} ${t('inviteDialog.hasInvited')}`);
    dispatch(setInviteDialogOpen(false));
  };

  return (
    <CommonDialog
      open={inviteDialogOpen}
      title={t('inviteDialog.inviteUser')}
      onClose={handleClose}
      maxWidth='xs'
      mode='display'
    >
      <TextField
        variant='standard'
        name='email'
        label={t('inviteDialog.email')}
        fullWidth
        sx={{ marginBottom: theme.spacing(1) }}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='start'>
              <IconButton
                css={focus ? styles.iconbuttonFocus : styles.iconbutton}
                onClick={handleSendClick}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={handleInputChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </CommonDialog>
  );
};

export default InviteDialog;
