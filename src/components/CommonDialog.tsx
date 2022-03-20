import React from 'react';
import { css } from '@emotion/react';
import { Breakpoint, Paper, useTheme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DIALOG_MODE } from '../features/types';

type Props = {
  children?: JSX.Element;
  open: boolean;
  title: string;
  onClose: () => void;
  onRegister?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onEditMode?: () => void;
  maxWidth?: Breakpoint;
  mode: DIALOG_MODE;
};

const CommonDialog = (props: Props) => {
  const theme = useTheme();
  const styles = {
    // dialog: css`
    //   width: 200px;
    // `,
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
  };

  return (
    <Dialog
      // css={styles.dialog}
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="form-dialog-title"
      maxWidth={'maxWidth' in props && props.maxWidth}
      fullWidth
    >
      <Paper>
        <Stack direction="row" justifyContent="space-between">
          <DialogTitle css={styles.title}>{props.title}</DialogTitle>
          <Box css={styles.close}>
            <IconButton size="small" onClick={props.onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Stack>
        <form
          css={styles.form}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {props.children}
        </form>
        {props.mode === 'register' && (
          <DialogActions>
            <Button onClick={props.onClose} color="primary">
              キャンセル
            </Button>
            <Button onClick={props.onRegister} color="primary">
              登録
            </Button>
          </DialogActions>
        )}
        {props.mode === 'edit' && (
          <DialogActions>
            <Button onClick={props.onClose} color="primary">
              キャンセル
            </Button>
            <Button onClick={props.onEdit} color="primary">
              登録
            </Button>
          </DialogActions>
        )}
        {props.mode === 'detail' && (
          <DialogActions>
            <Button onClick={props.onDelete} color="primary">
              削除
            </Button>
            <Button onClick={props.onEditMode} color="primary">
              編集
            </Button>
          </DialogActions>
        )}
        {props.mode === 'display' && (
          <DialogActions sx={{ marginTop: theme.spacing(1) }}></DialogActions>
        )}
      </Paper>
    </Dialog>
  );
};

export default CommonDialog;
