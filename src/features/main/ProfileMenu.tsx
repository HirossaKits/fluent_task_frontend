import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';
import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {
  selectProfileMenuOpen,
  setProfileMenuOpen,
  setProfileDialogOpen,
} from './mainSlice';
import { selectLoginUserInfo, setPersonalSettings } from '../auth/authSlice';
import {
  setOrgDialogOpen,
  setEditedOrgName,
  fetchAsyncRegisterPublicOrg,
} from '../org/orgSliece';
import CommonAvatar from '../../components/CommonAvatar';
import ProfileDialog from './ProfileDialog';
import OrgDialog from '../org/OrgDialog';
import useMessage from '../../hooks/message';

type Props = {
  anchorEl: React.MutableRefObject<null>;
};

const ProfileMenu: React.FC<Props> = (props) => {
  const theme = useTheme();
  const styles = {
    wrap: css`
      display: flex;
      flex-direction: column;
      min-width: 220px;
      padding: ${theme.spacing(2)};
      padding-bottom: 0;
    `,
    name: css`
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;
      text-align: center;
    `,
    comment: css`
      margin-top: ${theme.spacing(2)};
      margin-bottom: ${theme.spacing(1)};
      text-align: center;
    `,
    menuItem: css`
      padding-left: ${theme.spacing(2)};
      padding-right: ${theme.spacing(2)};
    `,
    icon: css`
      margin-right: ${theme.spacing(2)};
    `,
  };

  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const profileMenuOpen = useSelector(selectProfileMenuOpen);
  const loginUserInfo = useSelector(selectLoginUserInfo);
  const message = useMessage();

  const handleEditProfileClick = () => {
    dispatch(setProfileDialogOpen(true));
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('localJWT');
    history.push('/login');
    // dispatch(setIsAuthenticated(false));
  };

  const handleRegisterOrgOpenClick = () => {
    if (loginUserInfo.is_premium) {
      message(t('profileMenu.cannotCreateMultiGroup'));
      return;
    }
    dispatch(setEditedOrgName(''));
    dispatch(setOrgDialogOpen(true));
  };

  const handleRegisterOrgClick = () => {
    dispatch(fetchAsyncRegisterPublicOrg());
    dispatch(setPersonalSettings);
    dispatch(setOrgDialogOpen(false));
  };

  const handleClose = () => {
    dispatch(setProfileMenuOpen(false));
  };

  return (
    <>
      <Popover
        open={profileMenuOpen}
        anchorEl={props.anchorEl.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleClose}
        keepMounted
      >
        <Box css={styles.wrap}>
          <Box sx={{ display: 'flex' }}>
            <CommonAvatar user={loginUserInfo} width="100px" fontSize="45px" />
            <Box css={styles.name}>
              <Typography variant="h5" component="div">
                {loginUserInfo.last_name}
              </Typography>
              <Typography variant="h5" component="div">
                {loginUserInfo.first_name}
              </Typography>
            </Box>
          </Box>
          <Box css={styles.comment}>
            <Typography noWrap variant="body2" component="div">
              {`${loginUserInfo.comment}`}
            </Typography>
          </Box>
        </Box>
        <MenuList>
          <MenuItem css={styles.menuItem} onClick={handleEditProfileClick}>
            <EditIcon css={styles.icon} fontSize="small" />
            <Typography>{t('profileMenu.edit')}</Typography>
          </MenuItem>
          <MenuItem css={styles.menuItem} onClick={handleRegisterOrgOpenClick}>
            <PeopleAltIcon css={styles.icon} fontSize="small" />
            <Typography>{t('profileMenu.createGroup')}</Typography>
          </MenuItem>
          <MenuItem css={styles.menuItem} onClick={handleLogoutClick}>
            <ExitToAppIcon css={styles.icon} fontSize="small" />
            <Typography>{t('profileMenu.logout')}</Typography>
          </MenuItem>
          {/* <MenuItem css={styles.menuItem} onClick={handleLogoutClick}>
            <GroupRemoveIcon css={styles.icon} fontSize="small" />
            <Typography>組織を脱退</Typography>
          </MenuItem> */}
        </MenuList>
      </Popover>
      <ProfileDialog />
      <OrgDialog mode="edit" onClick={handleRegisterOrgClick} />
    </>
  );
};

export default ProfileMenu;
