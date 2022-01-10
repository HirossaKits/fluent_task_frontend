import React from 'react';
import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  onRegisterClick?: () => void;
};

const CommonDialog = (props: Props) => {
  const theme = useTheme();
  const styles = {
    form: css`
      margin: 0 ${theme.spacing(5)};
    `,
    title: css`
      margin-left: ${theme.spacing(3)};
    `,
    close: css`
      margin: 10px;
    `,
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby='form-dialog-title'
      maxWidth='sm'
      fullWidth
    >
      <Stack direction='row' justifyContent='space-between'>
        <DialogTitle>{props.title}</DialogTitle>
        <Box css={styles.close}>
          <IconButton size='small' onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Stack>
      <form css={styles.form} noValidate autoComplete='off'></form>
      <DialogActions>
        <Button onClick={props.onClose} color='primary'>
          キャンセル
        </Button>
        <Button onClick={props.onRegisterClick} color='primary'>
          登録
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommonDialog;
