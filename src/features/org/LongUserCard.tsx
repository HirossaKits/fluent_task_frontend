import React from 'react';
import { css } from '@emotion/react';
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
import GppGoodIcon from '@mui/icons-material/GppGood';
import GppBadIcon from '@mui/icons-material/GppBad';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { USER_INFO } from '../types';

type Props = {
  user: USER_INFO;
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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card css={styles.card}>
        <IconButton css={styles.dot} onClick={handleClick}>
          <MoreHorizIcon fontSize="small" />
        </IconButton>
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
          {props.user.is_org_rep && (
            <CommonTooltip title="グループ所有者">
              <WorkspacePremiumIcon css={styles.iconPremium} />
            </CommonTooltip>
          )}
          {props.user.is_org_admin && (
            <CommonTooltip title="グループ管理者">
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
        <MenuItem>
          <ListItemIcon>
            <GppGoodIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>管理者にする</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <GppBadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>管理者から除外する</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PersonOffIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>グループから除外する</ListItemText>
        </MenuItem>
      </Popover>
    </>
  );
};

export default LongUserCard;
