import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CommonTooltip from '../../components/CommonTooltip';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import GppGoodIcon from '@mui/icons-material/GppGood';
import GppBadIcon from '@mui/icons-material/GppBad';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { USER_INFO } from '../types';
import useBootLoader from '../../hooks/bootLoader';
import {
  selectLoginUserInfo,
  selectPersonalSettings,
  setPersonalSettings,
  fetchAsyncUpdateSettings,
} from '../auth/authSlice';
import {
  selectOrgInfo,
  fetchAsyncIncludeOrgAdmin,
  fetchAsyncExcludeOrgAdmin,
  fetchAsyncExcludeOrgUser,
} from './orgSliece';
import useMessage from '../../hooks/message';
import { AppDispatch } from '../../app/store';

type Props = {
  user: USER_INFO;
  isOwner: boolean;
  isAdmin: boolean;
};

const LongUserCard = (props: Props) => {
  const theme = useTheme();
  const styles = {
    card: css`
      display: flex;
      flex-direction: column;
      width: 280px;
      height: 110px;
      margin-bottom: 10px;
      margin-right: 20px;
      position: relative;
    `,
    avatar: css`
      width: 70px;
      height: 70px;
      margin-top: 10px;
      margin-left: 10px;
      font-size: 32px;
    `,
    text: css`
      text-align: left;
      margin-left: 20px;
      margin-top: 10px;
      max-width: 160px;
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      justify-content: center;
    `,
    comment: css`
      display: flex;
      margin-top: 0px;
      margin-left: 100px;
    `,
    dot: css`
      position: absolute;
      top: 0px;
      right: 5px;
      z-index: 800;
      color: ${theme.palette.text.secondary};
    `,
    iconPremium: css`
      color: ${theme.palette.text.secondary};
      margin-right: 8px;
    `,
    iconAdmin: css`
      color: ${theme.palette.text.secondary};
      margin-right: 8px;
    `,
    iconMember: css`
      color: ${theme.palette.text.disabled};
      margin-right: 8px;
    `,
  };

  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const message = useMessage();
  const bootLoader = useBootLoader();
  const loginUserInfo = useSelector(selectLoginUserInfo);
  const personalSettings = useSelector(selectPersonalSettings);
  const orgInfo = useSelector(selectOrgInfo);

  const updateSettings = useCallback((settings) => {
    dispatch(setPersonalSettings(settings));
    dispatch(fetchAsyncUpdateSettings(settings));
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIncludeAdminClick = (user_id: string) => {
    if (!orgInfo.org_admin_id.includes(loginUserInfo.user_id)) {
      message(t('org.onlyAdminChange'));
      return;
    }
    if (orgInfo.org_admin_id.includes(props.user.user_id)) {
      message(t('org.alreadyAdmin'));
      return;
    }
    // 組織の管理者に追加
    dispatch(fetchAsyncIncludeOrgAdmin(user_id));
    handleClose();
  };

  const handleExcludeAdminClick = (user_id: string) => {
    if (!orgInfo.org_admin_id.includes(loginUserInfo.user_id)) {
      message(t('org.onlyAdminChange'));
      return;
    }
    // 組織の管理者から除外
    dispatch(fetchAsyncExcludeOrgAdmin(user_id));
    handleClose();
  };

  const handleExcludeFromGroupClick = (user_id: string) => {
    if (!orgInfo.org_admin_id.includes(loginUserInfo.user_id)) {
      message(t('org.onlyAdminChange'));
      return;
    }
    // 組織から除外
    dispatch(fetchAsyncExcludeOrgUser(user_id));
    handleClose();
  };

  const withDrawOrg = async (user_id: string) => {
    const res = await dispatch(fetchAsyncExcludeOrgUser(user_id));
    if (fetchAsyncExcludeOrgUser.fulfilled.match(res)) {
      bootLoader();
    }
  };

  const handleWithdrawOrgClick = (user_id: string) => {
    withDrawOrg(user_id);
    handleClose();
  };

  return (
    <>
      <Card css={styles.card}>
        {props.user.user_id !== orgInfo.org_owner_id && (
          <IconButton css={styles.dot} onClick={handleClick}>
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        )}
        <Box sx={{ display: 'flex' }}>
          {props.user.avatar_img ? (
            <Avatar css={styles.avatar} src={props.user.avatar_img} />
          ) : (
            <Avatar css={styles.avatar}>
              {props.user.last_name.slice(0, 1).toUpperCase() +
                props.user.first_name.slice(0, 1).toUpperCase()}
            </Avatar>
          )}
          <Box css={styles.text}>
            <Typography variant="h6" component="div">
              {`${props.user.last_name} ${props.user.first_name} `}
            </Typography>
            <Typography noWrap variant="body2" component="div">
              {`${props.user.comment}`}
            </Typography>
          </Box>
        </Box>
        <Box css={styles.comment}>
          {props.isOwner && (
            <CommonTooltip title={t('org.owner')}>
              <WorkspacePremiumIcon css={styles.iconPremium} />
            </CommonTooltip>
          )}
          {props.isAdmin && (
            <CommonTooltip title={t('org.admin')}>
              <AdminPanelSettingsIcon css={styles.iconAdmin} />
            </CommonTooltip>
          )}
        </Box>
      </Card>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => handleIncludeAdminClick(props.user.user_id)}>
          <ListItemIcon>
            <GppGoodIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('org.addToAdmin')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleExcludeAdminClick(props.user.user_id)}>
          <ListItemIcon>
            <GppBadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('org.excludeFromAdmin')}</ListItemText>
        </MenuItem>

        {props.user.user_id === loginUserInfo.user_id ? (
          <MenuItem onClick={() => handleWithdrawOrgClick(props.user.user_id)}>
            <ListItemIcon>
              <DirectionsRunIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t('org.withdrawFromGroup')}</ListItemText>
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => handleExcludeFromGroupClick(props.user.user_id)}
          >
            <ListItemIcon>
              <PersonOffIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t('org.excludeFromGroup')}</ListItemText>
          </MenuItem>
        )}
      </Popover>
    </>
  );
};

export default LongUserCard;
