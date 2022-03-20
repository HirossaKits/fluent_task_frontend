import React from 'react';
import { useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { fetchAsyncUpdateInvite } from '../org/orgSliece';
import { setNotificationDialogOpen } from './mainSlice';

type Props = {
  inviteId: string;
  orgName: string;
};

export const NotificationInviteItem = (props: Props) => {
  const dispatch = useDispatch();
  const handleClick = (value: boolean) => {
    const data = { invite_id: props.inviteId, result: value };
    dispatch(fetchAsyncUpdateInvite(data));
    dispatch(setNotificationDialogOpen(false));
  };

  return (
    <Stack
      direction="row"
      alignItems={'center'}
      justifyContent="flex-start"
      spacing={1}
    >
      <Typography>{`${props.orgName} からグループへの招待が届いています。`}</Typography>
      <Button startIcon={<CheckCircleIcon />} onClick={() => handleClick(true)}>
        参加
      </Button>
      <Button startIcon={<CancelIcon />} onClick={() => handleClick(false)}>
        拒否
      </Button>
    </Stack>
  );
};
