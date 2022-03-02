import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonTextField from '../../components/CommonTextField';
import CommonDialog from '../../components/CommonDialog';
import {
  selectOrgDialogOpen,
  selectEditedOrgName,
  setOrgName,
  setOrgDialogOpen,
  setEditedOrgName,
} from '../org/orgSliece';
import { TARGET } from '../types';

const OrgDialog = () => {
  const dispatch = useDispatch();
  const orgDialogOpen = useSelector(selectOrgDialogOpen);
  const editedOrgName = useSelector(selectEditedOrgName);

  const handleClose = () => {
    dispatch(setOrgDialogOpen(false));
  };

  const handleInputChange = (target: TARGET) => {
    dispatch(setEditedOrgName(target.value));
  };

  const handleRegisterClick = () => {
    dispatch(setOrgName(editedOrgName));
  };

  return (
    <CommonDialog
      open={orgDialogOpen}
      title="グループを編集"
      onClose={handleClose}
      onRegister={handleRegisterClick}
      maxWidth="xs"
      mode="edit"
    >
      <CommonTextField
        // label='組織名'
        name="org_name"
        value={editedOrgName}
        onChange={handleInputChange}
        width="100%"
      />
    </CommonDialog>
  );
};

export default OrgDialog;
