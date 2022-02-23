import React from 'react';
import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import CommonSwitch from '../../components/CommonSwitch';
import { useSelector, useDispatch } from 'react-redux';
import { TARGET } from '../types';
import {
  selectLoginUserInfo,
  selectPersonalSettings,
  setPersonalSettings,
  fetchAsyncUpdateSettings,
} from '../auth/authSlice';
import { selectOrgInfo } from '../org/orgSliece';
import { selectSettingsMenuOpen, setSettingsMenuOpen } from './mainSlice';
import { setMessageOpen, setMessage } from '../main/mainSlice';
import CommonSelect from '../../components/CommonSelect';
import useCreateOption from '../../hooks/optionCreater';

type Props = {
  anchorEl: React.MutableRefObject<null>;
};

const SettingsMenu: React.FC<Props> = (props) => {
  const theme = useTheme();
  const loginUserInfo = useSelector(selectLoginUserInfo);
  const settingsMenuOpen = useSelector(selectSettingsMenuOpen);
  const personalSettings = useSelector(selectPersonalSettings);
  const dispatch = useDispatch();
  const createOption = useCreateOption();

  const orgOptions = createOption(
    loginUserInfo.joined_org,
    'org_id',
    'org_name'
  );

  const validateOrgId = () => {
    const joinedOrgId = loginUserInfo.joined_org.map((org) => org.org_id);
    if (joinedOrgId.includes(personalSettings.selected_org_id)) {
      return personalSettings.selected_org_id;
    } else {
      const settings = {
        ...personalSettings,
        selected_org_id: joinedOrgId[0],
      };
      dispatch(setPersonalSettings(settings));
      dispatch(fetchAsyncUpdateSettings(settings));
      return joinedOrgId[0];
    }
  };

  const handleInputChange = (target: TARGET) => {
    console.log(target);
    if (target.name === 'private_mode' && !loginUserInfo.joined_org) {
      if (personalSettings.private_mode === false) {
        dispatch(
          setPersonalSettings({ ...personalSettings, private_mode: true })
        );
      }
      dispatch(
        setMessage(
          '現在プライベートモードしか利用できません。グループに参加するか、グループを作成してください。'
        )
      );
      dispatch(setMessageOpen(true));
      return;
    }
    const settings = { ...personalSettings, [target.name]: target.value };
    dispatch(setPersonalSettings(settings));
    dispatch(fetchAsyncUpdateSettings(settings));
  };

  const handleColse = () => {
    dispatch(setSettingsMenuOpen(false));
  };

  const styles = {
    paper: css`
      padding-left: ${theme.spacing(2)};
      padding-top: ${theme.spacing(2)};
      padding-right: ${theme.spacing(4)};
      padding-bottom: ${theme.spacing(2)};
    `,
  };

  return (
    <Popover
      open={settingsMenuOpen}
      anchorEl={props.anchorEl.current}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      onClose={handleColse}
      keepMounted
    >
      <Paper css={styles.paper}>
        <CommonSwitch
          label={'ダークモード'}
          labelWidth={10}
          name="dark_mode"
          value={personalSettings.dark_mode}
          onChange={handleInputChange}
        />
        <CommonSwitch
          label={'ツールチップ'}
          labelWidth={10}
          name="tooltip"
          value={personalSettings.tooltip}
          onChange={handleInputChange}
        />
        <CommonSwitch
          label={'プライベートモード'}
          labelWidth={10}
          name="private_mode"
          value={personalSettings.private_mode}
          onChange={handleInputChange}
        />
        {!personalSettings.private_mode && (
          <CommonSelect
            label="グループを選択"
            options={orgOptions}
            name="selected_org_id"
            value={validateOrgId()}
            onChange={handleInputChange}
          />
        )}
      </Paper>
    </Popover>
  );
};

export default SettingsMenu;
