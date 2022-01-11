import React from 'react';
import { css } from '@emotion/react';
import { Breakpoint, useTheme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  children?: JSX.Element;
  open: boolean;
  title: string;
  onClose: () => void;
  onRegisterClick?: () => void;
  maxWidth?: Breakpoint;
  type: 'input' | 'display';
};

const CommonDialog = (props: Props) => {
  const theme = useTheme();
  const styles = {
    title: css`
      margin-left: ${theme.spacing(1)};
    `,
    close: css`
      margin: 10px;
    `,
    form: css`
      margin: 0 ${theme.spacing(5)};
    `,
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby='form-dialog-title'
      maxWidth={'maxWidth' in props && props.maxWidth}
      fullWidth
    >
      <Stack direction='row' justifyContent='space-between'>
        <DialogTitle css={styles.title}>{props.title}</DialogTitle>
        <Box css={styles.close}>
          <IconButton size='small' onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Stack>
      <form css={styles.form} noValidate autoComplete='off'>
        {props.children}
      </form>
      {props.type === 'input' && (
        <DialogActions>
          <Button onClick={props.onClose} color='primary'>
            キャンセル
          </Button>
          <Button onClick={props.onRegisterClick} color='primary'>
            登録
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CommonDialog;
