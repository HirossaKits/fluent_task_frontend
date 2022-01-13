import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonTextField from "../../components/CommonTextField";
import CommonDialog from "../../components/CommonDialog";
import { selectOrgDialogOpen, setOrgDialogOpen } from "../org/orgSliece";

const OrgDialog = () => {
  const dispatch = useDispatch();
  const orgDialogOpen = useSelector(selectOrgDialogOpen);

  const handleClose = () => {
    dispatch(setOrgDialogOpen(false));
  };

  return (
    <CommonDialog
      open={orgDialogOpen}
      title="組織を編集"
      onClose={handleClose}
      maxWidth="sm"
      mode="edit"
    >
      <CommonTextField
        label="組織名"
        name="org_name"
        // value={editedProject.project_name}
        // onChange={handleInputChange}
        width="100%"
      />
    </CommonDialog>
  );
};

export default OrgDialog;
