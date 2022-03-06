import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import Popover from '@mui/material/Popover';
import Avatar from '@mui/material/Avatar';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import { selectLoginUserInfo } from '../auth/authSlice';
import { selectProfileMenuOpen } from './mainSlice';
import { setProfileMenuOpen, setProfileDialogOpen } from './mainSlice';
import { logOut } from '../auth/authSlice';
import ProfileDialog from './ProfileDialog';
import CommonAvatar from '../../components/CommonAvatar';
import { cpuUsage } from 'process';

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

  const dispatch = useDispatch();
  const profileMenuOpen = useSelector(selectProfileMenuOpen);
  const loginUserInfo = useSelector(selectLoginUserInfo);

  const handleEditProfileClick = () => {
    dispatch(setProfileDialogOpen(true));
  };

  const handleLogoutClick = () => {
    dispatch(logOut());
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
            <Typography>プロフィール編集</Typography>
          </MenuItem>
          <MenuItem css={styles.menuItem} onClick={handleLogoutClick}>
            <ExitToAppIcon css={styles.icon} fontSize="small" />
            <Typography>ログアウト</Typography>
          </MenuItem>
          {/* <MenuItem css={styles.menuItem} onClick={handleLogoutClick}>
            <GroupRemoveIcon css={styles.icon} fontSize="small" />
            <Typography>組織を脱退</Typography>
          </MenuItem> */}
        </MenuList>
      </Popover>
      <ProfileDialog />
    </>
  );
};

export default ProfileMenu;
