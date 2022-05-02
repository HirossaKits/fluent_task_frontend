import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import useBootLoader from '../../hooks/bootLoader';
import {
  fetchAsyncGetLoginUser,
  fetchAsyncUpdateSettings,
  selectPersonalSettings,
  setPersonalSettings,
} from '../auth/authSlice';
import { setMainComponentName, setNotificationDialogOpen } from './mainSlice';
import { fetchAsyncUpdateInvite } from '../org/orgSliece';
import { PERSONAL_SETTINGS } from '../types';

type Props = {
  inviteId: string;
  orgId: string;
  orgName: string;
};

export const NotificationInviteItem = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const bootLoader = useBootLoader();
  const personalSettings = useSelector(selectPersonalSettings);

  const updateInvite = async (data: { invite_id: string; result: boolean }) => {
    const res = await dispatch(fetchAsyncUpdateInvite(data));
    if (fetchAsyncUpdateInvite.fulfilled.match(res)) {
      await dispatch(fetchAsyncGetLoginUser());
    }
  };

  const updateSettings = async (settings: PERSONAL_SETTINGS) => {
    const res = await dispatch(fetchAsyncUpdateSettings(settings));
    return res;
  };

  const handleClick = (approval: boolean) => {
    const data = { invite_id: props.inviteId, result: approval };

    updateInvite(data).then(() => {
      // 承認した場合はその組織を表示させる
      if (approval) {
        const settings = {
          ...personalSettings,
          private_mode: false,
          selected_org_id: props.orgId,
        };
        updateSettings(settings).then((res) => {
          if (fetchAsyncUpdateSettings.fulfilled.match(res)) {
            bootLoader();
            dispatch(setNotificationDialogOpen(false));
            dispatch(setMainComponentName('Org'));
          }
        });
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
