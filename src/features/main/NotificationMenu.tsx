import { useTheme } from '@mui/material/styles';
import { css } from '@emotion/react';
import {
  Dialog,
  Divider,
  Paper,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectNotificationDialogOpen,
  setNotificationDialogOpen,
} from './mainSlice';
import { NotificationInviteItem } from './NotificationInviteItem';
import { selectInvite } from '../org/orgSliece';

type Props = {
  anchorEl: React.MutableRefObject<null>;
};

const NotificationMenu = (props: Props) => {
  const theme = useTheme();
  const styles = {
    paper: css`
      padding: ${theme.spacing(2)};
    `,
  };

  const dispatch = useDispatch();
  const dialogOpen = useSelector(selectNotificationDialogOpen);
  const invite = useSelector(selectInvite);

  const handleClose = () => {
    dispatch(setNotificationDialogOpen(false));
  };

  return (
    <Popover
      anchorEl={props.anchorEl.current}
      open={dialogOpen}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Paper css={styles.paper}>
        {invite.length ? (
          invite.map((inv) => (
            <>
              <NotificationInviteItem
                inviteId={inv.invite_id}
                orgName={inv.org_name}
              />
            </>
          ))
        ) : (
          <Typography>通知はありません。</Typography>
        )}
      </Paper>
    </Popover>
  );
};

export default NotificationMenu;
