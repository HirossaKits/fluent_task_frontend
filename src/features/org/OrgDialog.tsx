import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CommonTextField from '../../components/CommonTextField';
import CommonDialog from '../../components/CommonDialog';
import { AppDispatch } from '../../app/store';
import { TARGET } from '../types';
import useJoinOrgBootLoader from '../../hooks/joinOrgBootLoader';
import {
  selectOrgDialogOpen,
  selectOrgDialogMode,
  selectEditedOrgName,
  setOrgDialogOpen,
  setEditedOrgName,
  fetchAsyncUpdateOrgInfo,
  fetchAsyncRegisterPublicOrg,
} from '../org/orgSliece';
import { selectPersonalSettings } from '../auth/authSlice';
import { setMainComponentName, setProfileMenuOpen } from '../main/mainSlice';

const OrgDialog = () => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const joinOrgBootLoader = useJoinOrgBootLoader();
  const personalSettings = useSelector(selectPersonalSettings);
  const orgDialogOpen = useSelector(selectOrgDialogOpen);
  const orgDealogMode = useSelector(selectOrgDialogMode);
  const editedOrgName = useSelector(selectEditedOrgName);

  const handleClose = () => {
    dispatch(setOrgDialogOpen(false));
  };

  const handleInputChange = (target: TARGET) => {
    dispatch(setEditedOrgName(target.value));
  };

  const handleEditOrg = () => {
    dispatch(fetchAsyncUpdateOrgInfo());
    dispatch(setOrgDialogOpen(false));
  };

  const handleRegisterOrg = () => {
    const createOrg = async () => {
      const res = await dispatch(fetchAsyncRegisterPublicOrg());
      if (fetchAsyncRegisterPublicOrg.fulfilled.match(res)) {
        const settings = {
          ...personalSettings,
          private_mode: false,
          selected_org_id: res.payload.org_id,
        };
        joinOrgBootLoader(settings);
      }
    };
    createOrg();
    dispatch(setOrgDialogOpen(false));
    dispatch(setProfileMenuOpen(false));
    dispatch(setMainComponentName('Org'));
  };

  return (
    <CommonDialog
      open={orgDialogOpen}
      title={
        orgDealogMode === 'edit' ? t('orgDialog.edit') : t('orgDialog.register')
      }
      onClose={handleClose}
      onEdit={handleEditOrg}
      onRegister={handleRegisterOrg}
      maxWidth="xs"
      mode={orgDealogMode}
    >
      <CommonTextField
        label={t('orgDialog.orgName')}
        name="org_name"
        value={editedOrgName}
        onChange={handleInputChange}
        width="100%"
      />
    </CommonDialog>
  );
};

export default OrgDialog;
