import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  selectLoginUserInfo,
  selectPersonalSettings,
  setPersonalSettings,
} from '../auth/authSlice';
import { setNotificationDialogOpen } from './mainSlice';
import { fetchAsyncGetOrgInfo, fetchAsyncUpdateInvite } from '../org/orgSliece';

type Props = {
  inviteId: string;
  orgName: string;
};

export const NotificationInviteItem = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const loginUserInfo = useSelector(selectLoginUserInfo);
  const settings = useSelector(selectPersonalSettings);

  const handleClick = (value: boolean) => {
    const data = { invite_id: props.inviteId, result: value };
    const update = async () => {
      const res = await dispatch(fetchAsyncUpdateInvite(data));
      if (fetchAsyncUpdateInvite.fulfilled.match(res)) {
        await dispatch(fetchAsyncGetOrgInfo());
      }
    };
    console.log('ooops!');
    console.log('debug_1', loginUserInfo);
    update().then(() => {
      dispatch(setNotificationDialogOpen(false));
      console.log('debug_2', loginUserInfo);
      // 承認した場合はその組織を表示させる
      if (value) {
        dispatch(
          setPersonalSettings({
            ...settings,
            private_mode: false,
            selected_org_id: loginUserInfo.joined_org
              .filter((org) => org.is_private === false)
              ?.slice(-1)[0],
          })
        );
      }
    });
  };

  return (
    <Stack
      direction="row"
      alignItems={'center'}
      justifyContent="flex-start"
      spacing={1}
    >
      <Typography>
        {t('notification.inviteFront') +
          props.orgName +
          t('notification.inviteRear')}
      </Typography>
      <Button startIcon={<CheckCircleIcon />} onClick={() => handleClick(true)}>
        {t('notification.join')}
      </Button>
      <Button startIcon={<CancelIcon />} onClick={() => handleClick(false)}>
        {t('notification.reject')}
      </Button>
    </Stack>
  );
};
