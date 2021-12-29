import React from 'react';
import { css } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Grow, { GrowProps } from '@mui/material/Grow';
import {
  selectMessageOpen,
  selectMessage,
  setMessageOpen,
  setMessage,
} from '../features/main/mainSlice';

const growTransition = (props: GrowProps) => {
  return (
    <Grow {...props} style={{ transformOrigin: '100% 100% 0' }} timeout={400} />
  );
};

const CommonMessageBar = () => {
  const styles = {
    bar: css`
      opacity: 0.8;
    `,
  };

  const dispatch = useDispatch();
  const messageOpen = useSelector(selectMessageOpen);
  const message = useSelector(selectMessage);
  const handleClose = () => {
    dispatch(setMessageOpen(false));
  };

  return (
    <Snackbar
      css={styles.bar}
      open={messageOpen}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      onClose={handleClose}
      TransitionComponent={growTransition}
      message={message}
      autoHideDuration={2400}
    />
  );
};

export default CommonMessageBar;
