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
import { selectLoginUserProf } from '../auth/authSlice';
import { selectProfileMenuOpen } from './mainSlice';
import { setProfileMenuOpen, setProfileDialogOpen } from './mainSlice';
import { logOut } from '../auth/authSlice';
import ProfileDialog from './ProfileDialog';

type Props = {
  anchorEl: React.MutableRefObject<null>;
};

const ProfileMenu: React.FC<Props> = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const profileMenuOpen = useSelector(selectProfileMenuOpen);
  const loginUserProf = useSelector(selectLoginUserProf);

  const handleEditProfileClick = () => {
    dispatch(setProfileDialogOpen(true));
  };

  const handleLogoutClick = () => {
    dispatch(logOut());
  };

  const handleClose = () => {
    dispatch(setProfileMenuOpen(false));
  };

  const styles = {
    wrap: css`
      display: flex;
      flex-direction: column;
      min-width: 210px;
      padding: 10px 10px 0 10px;
    `,
    avatar: css`
      width: 100px;
      height: 100px;
      font-size: 36px;
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
      margin-top: 2px;
      margin-right: ${theme.spacing(1)};
    `,
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
            {loginUserProf.avatar_img ? (
              <Avatar css={styles.avatar} src={loginUserProf.avatar_img} />
            ) : (
              <Avatar css={styles.avatar}>
                {loginUserProf.last_name + loginUserProf.first_name}
              </Avatar>
            )}
            <Box css={styles.name}>
              <Typography variant='h5' component='div'>
                {loginUserProf.last_name}
              </Typography>
              <Typography variant='h5' component='div'>
                {loginUserProf.first_name}
              </Typography>
            </Box>
          </Box>
          <Box css={styles.comment}>
            <Typography noWrap variant='body2' component='div'>
              {`${loginUserProf.comment}`}
            </Typography>
          </Box>
        </Box>
        <MenuList>
          <MenuItem css={styles.menuItem} onClick={handleEditProfileClick}>
            <EditIcon css={styles.icon} fontSize='small' />
            <Typography>プロフィール編集</Typography>
          </MenuItem>
          <MenuItem css={styles.menuItem} onClick={handleLogoutClick}>
            <ExitToAppIcon css={styles.icon} fontSize='small' />
            <Typography>ログアウト</Typography>
          </MenuItem>
          <MenuItem css={styles.menuItem} onClick={handleLogoutClick}>
            <GroupRemoveIcon css={styles.icon} fontSize='small' />
            <Typography>組織を脱退</Typography>
          </MenuItem>
        </MenuList>
      </Popover>
      <ProfileDialog />
    </>
  );
};

export default ProfileMenu;
