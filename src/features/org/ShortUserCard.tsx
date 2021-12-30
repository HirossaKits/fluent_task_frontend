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
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { USER_PROFILE } from '../types';

type Props = {
  user: USER_PROFILE;
};

const ShortUserCard = (props: Props) => {
  const theme = useTheme();
  const styles = {
    card: css`
      display: flex;
      flex-direction: column;
      width: 210px;
      height: 130px;
      margin: 10px 20px;
      position: relative;
    `,
    avatar: css`
      width: 80px;
      height: 80px;
      margin-top: 10px;
      margin-left: 10px;
      font-size: 36px;
    `,
    name: css`
      margin-top: 10px;
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      justify-content: center;
    `,
    comment: css`
      margin-top: 9px;
      margin-left: 18px;
      margin-right: 18px;
    `,
    dot: css`
      position: absolute;
      top: 0px;
      right: 5px;
      z-index: 800;
      color: ${theme.palette.divider};
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
          <MoreHorizIcon fontSize='small' />
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
          <Box css={styles.name}>
            <Typography variant='h5' component='div'>
              {props.user.last_name}
            </Typography>
            <Typography variant='h5' component='div'>
              {props.user.first_name}
            </Typography>
          </Box>
        </Box>
        <Box css={styles.comment}>
          <Typography noWrap variant='body2' component='div'>
            {`${props.user.comment}`}
          </Typography>
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
            <PersonRemoveIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>ユーザーを削除</ListItemText>
        </MenuItem>
      </Popover>
    </>
  );
};

export default ShortUserCard;
