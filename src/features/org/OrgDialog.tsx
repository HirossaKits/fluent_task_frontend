import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CommonTextField from '../../components/CommonTextField';
import CommonDialog from '../../components/CommonDialog';
import { TARGET } from '../types';
import {
  selectOrgDialogOpen,
  selectEditedOrgName,
  setOrgDialogOpen,
  setEditedOrgName,
  fetchAsyncUpdateOrgInfo,
} from '../org/orgSliece';

const OrgDialog = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const orgDialogOpen = useSelector(selectOrgDialogOpen);
  const editedOrgName = useSelector(selectEditedOrgName);

  const handleClose = () => {
    dispatch(setOrgDialogOpen(false));
  };

  const handleInputChange = (target: TARGET) => {
    dispatch(setEditedOrgName(target.value));
  };

  const handleEdit = () => {
    dispatch(fetchAsyncUpdateOrgInfo(editedOrgName));
    dispatch(setOrgDialogOpen(false));
  };

  return (
    <CommonDialog
      open={orgDialogOpen}
      title={t('orgDialog.edit')}
      onClose={handleClose}
      onEdit={handleEdit}
      maxWidth='xs'
      mode='edit'
    >
      <CommonTextField
        label={t('orgDialog.orgName')}
        name='org_name'
        value={editedOrgName}
        onChange={handleInputChange}
        width='100%'
      />
    </CommonDialog>
  );
};

export default OrgDialog;
