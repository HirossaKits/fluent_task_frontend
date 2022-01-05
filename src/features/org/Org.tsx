import React from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { ORG_USER } from '../types';
import LongUserCard from './LongUserCard';
import CommonTooltip from '../../components/CommonTooltip';
import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { selectOrgName, selectOrgUser } from './orgSliece';

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

  // const [focus, setFocus] = React.useState(false);

  // const handleOnFocus = () => {
  //   setFocus(true);
  // };
  // const handleOnBlur = () => {
  //   setFocus(false);
  // };

  const orgName = useSelector(selectOrgName);
  const users = useSelector(selectOrgUser);

  return (
    <>
      <Box css={styles.invite}>
        {/* <TextField
          css={styles.textfield}
          variant='standard'
          label='ユーザーを招待'
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='start'>
                <IconButton
                  css={focus ? styles.iconbuttonFocus : styles.iconbutton}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        /> */}
      </Box>

      <Box css={styles.header}>
        <Box css={styles.titleWrap}>
          <Typography css={styles.titleText} variant='h5' component='div'>
            {orgName}
          </Typography>
          <CommonTooltip title='編集'>
            <IconButton css={styles.editIcon}>
              <EditIcon fontSize='small' />
            </IconButton>
          </CommonTooltip>
        </Box>
        {/* <Button
          startIcon={<SettingsIcon sx={{ marginBottom: '1px' }} />}
          css={styles.button}
        >
          組織の設定
        </Button> */}
        <div>
          <Button
            startIcon={<GroupAddIcon sx={{ marginBottom: '1px' }} />}
            css={styles.button}
          >
            ユーザーを招待
          </Button>
        </div>
      </Box>

      <Box css={styles.wrap}>
        {users.map((user) => (
          <LongUserCard user={user} />
        ))}
      </Box>
    </>
  );
};

export default Org;
