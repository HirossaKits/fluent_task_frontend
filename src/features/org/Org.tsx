import React from 'react';
import { css } from '@emotion/react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import { dummyUsers } from '../../DummyData';
import { USER_PROFILE } from '../types';
import LongUserCard from './LongUserCard';
import CommonTooltip from '../../components/CommonTooltip';
import GppGoodIcon from '@mui/icons-material/GppGood';
import GppBadIcon from '@mui/icons-material/GppBad';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

const Org = () => {
  const theme = useTheme();
  const styles = {
    invite: css`
      width: 100%;
      display: flex;
      align-content: center;
      justify-content: center;
    `,
    buttonArea: css`
      width: 100%;
      margin: 10px 0;
      display: flex;
      align-content: center;
      justify-content: flex-start;
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

  const [focus, setFocus] = React.useState(false);

  const handleOnFocus = () => {
    setFocus(true);
  };
  const handleOnBlur = () => {
    setFocus(false);
  };

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

      <Box css={styles.buttonArea}>
        {/* <CommonTooltip title='組織の設定'>
          <IconButton>
            <SettingsIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </CommonTooltip>
        <CommonTooltip title='ユーザーを招待'>
          <IconButton>
            <GroupAddIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </CommonTooltip> */}
        {/* <CommonTooltip title='組織を脱退'>
          <IconButton>
            <DirectionsRunIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </CommonTooltip> */}
        <Button
          startIcon={<SettingsIcon sx={{ marginBottom: '1px' }} />}
          css={styles.button}
        >
          組織の設定
        </Button>
        <Button
          startIcon={<GroupAddIcon sx={{ marginBottom: '1px' }} />}
          css={styles.button}
        >
          ユーザーを招待
        </Button>
      </Box>

      <Box css={styles.wrap}>
        {dummyUsers.map((user: USER_PROFILE) => (
          <LongUserCard user={user} />
        ))}
      </Box>
    </>
  );
};

export default Org;
