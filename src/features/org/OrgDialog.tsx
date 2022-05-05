import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CommonTextField from '../../components/CommonTextField';
import CommonDialog from '../../components/CommonDialog';
import { TARGET } from '../types';
import {
  selectOrgDialogOpen,
  selectOrgDialogMode,
  selectEditedOrgName,
  setOrgDialogOpen,
  setEditedOrgName,
} from '../org/orgSliece';

type Props = {
  onEdit?: () => void;
  onRegister?: () => void;
};

const OrgDialog = (props: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const orgDialogOpen = useSelector(selectOrgDialogOpen);
  const orgDealogMode = useSelector(selectOrgDialogMode);
  const editedOrgName = useSelector(selectEditedOrgName);

  const handleClose = () => {
    dispatch(setOrgDialogOpen(false));
  };

  const handleInputChange = (target: TARGET) => {
    dispatch(setEditedOrgName(target.value));
  };

  return (
    <CommonDialog
      open={orgDialogOpen}
      title={
        orgDealogMode === 'edit' ? t('orgDialog.edit') : t('orgDialog.register')
      }
      onClose={handleClose}
      onEdit={props.onEdit}
      onRegister={props.onRegister}
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
