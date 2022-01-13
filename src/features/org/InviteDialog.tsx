import React from 'react';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import CommonDialog from '../../components/CommonDialog';
import {
  selectInviteDialogOpen,
  selectEditedInviteMail,
  setInviteDialogOpen,
  setEditedInviteMail,
} from './orgSliece';
import { TARGET } from '../types';

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

  const handleInputChange = (target: TARGET) => {
    dispatch(setEditedInviteMail(target.value));
  };

  const handleRegisterClick = () => {
    console.log('Send email here');
  };

  return (
    <CommonDialog
      open={inviteDialogOpen}
      title='ユーザーを招待'
      onClose={handleClose}
      maxWidth='xs'
      mode='display'
    >
      <TextField
        variant='standard'
        label='メールアドレス'
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
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </CommonDialog>
  );
};

export default InviteDialog;
