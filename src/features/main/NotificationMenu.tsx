import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  selectNotificationDialogOpen,
  setNotificationDialogOpen,
} from './mainSlice';
import { selectInvite } from '../org/orgSliece';
import { NotificationInviteItem } from './NotificationInviteItem';

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
  const { t } = useTranslation();
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
                orgId={inv.org_id}
                orgName={inv.org_name}
              />
            </>
          ))
        ) : (
          <Typography>{t('notification.noNotification')}</Typography>
        )}
      </Paper>
    </Popover>
  );
};

export default NotificationMenu;
