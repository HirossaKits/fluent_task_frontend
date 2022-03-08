import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import LongUserCard from './LongUserCard';
import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import OrgDialog from './OrgDialog';
import InviteDialog from './InviteDialog';
import CommonTooltip from '../../components/CommonTooltip';
import { selectLoginUserInfo } from '../auth/authSlice';
import {
  selectOrgInfo,
  setEditedOrgName,
  setOrgDialogOpen,
  setInviteDialogOpen,
} from './orgSliece';
import useMessage from '../../hooks/message';

const Org = () => {
  const theme = useTheme();
  const styles = {
    header: css`
      width: 100%;
      margin: 10px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,
    titleWrap: css`
      display: flex;
      align-items: center;
    `,
    titleText: css`
      padding-bottom: 2px;
    `,
    editIcon: css`
      margin-left: 16px;
    `,
    invite: css`
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    `,
    button: css`
      padding: 10px;
      margin: 5px 20px;
      color: ${theme.palette.primary.main};
    `,
    textfield: css`
      width: 17ch;
      margin: ${theme.spacing(1)};
    `,
    iconbutton: css`
      color: inherit;
    `,
    iconbuttonFocus: css`
      color: ${theme.palette.primary.main};
    `,
    wrap: css`
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-content: start;
      height: 90vh;
      margin-top: ${theme.spacing(1)};
    `,
  };

  const dispatch = useDispatch();
  const orgInfo = useSelector(selectOrgInfo);
  const loginUserInfo = useSelector(selectLoginUserInfo);
  const message = useMessage();

  const handleEditClick = () => {
    if (orgInfo.org_owner_id === loginUserInfo.user_id) {
      message('グループ所有者のみ変更可能です。');
      return;
    }
    dispatch(setEditedOrgName(orgInfo.org_name));
    dispatch(setOrgDialogOpen(true));
  };

  const handleInviteClick = () => {
    dispatch(setInviteDialogOpen(true));
  };

  return (
    <>
      <Box css={styles.header}>
        <Box css={styles.titleWrap}>
          <Typography css={styles.titleText} variant="h5" component="div">
            {orgInfo.org_name}
          </Typography>
          <CommonTooltip title="編集">
            <IconButton css={styles.editIcon} onClick={handleEditClick}>
              <EditIcon fontSize="small" />
            </IconButton>
          </CommonTooltip>
        </Box>
        <div>
          <Button
            css={styles.button}
            startIcon={<GroupAddIcon sx={{ marginBottom: '1px' }} />}
            onClick={handleInviteClick}
          >
            ユーザーを招待
          </Button>
        </div>
      </Box>

      <Box css={styles.wrap}>
        {orgInfo.org_user?.map((user) => (
          <LongUserCard
            user={user}
            isOwner={user.user_id === orgInfo.org_owner_id}
            isAdmin={orgInfo.org_admin_id.includes(user.user_id)}
          />
        ))}
      </Box>
      <OrgDialog />
      <InviteDialog />
    </>
  );
};

export default Org;
