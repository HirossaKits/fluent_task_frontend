import React, { useEffect } from 'react';
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
import { fetchAsyncGetOrgInfo, selectOrgInfo } from '../org/orgSliece';
import { selectSettingsMenuOpen, setSettingsMenuOpen } from './mainSlice';
import { setMessageOpen, setMessage } from '../main/mainSlice';
import { fetchAsyncGetProject } from '../proj/projectSlice';
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

  const fetchInSequenceRelatedOrg = async () => {
    await dispatch(fetchAsyncGetOrgInfo());
    // project 取得処理
    await dispatch(fetchAsyncGetProject());
    // task 取得処理
  };

  useEffect(() => {
    dispatch(fetchAsyncGetOrgInfo());
  }, [personalSettings.selected_org_id]);

  const handleInputChange = (target: TARGET) => {
    const settings = { ...personalSettings, [target.name]: target.value };
    dispatch(setPersonalSettings(settings));
    dispatch(fetchAsyncUpdateSettings(settings));
  };

  const validateOrgId = () => {
    const joinedOrgId = loginUserInfo.joined_org.map((org) => org.org_id);
    // 設定に保持する organization に所属していない場合を考慮
    if (joinedOrgId.includes(personalSettings.selected_org_id)) {
      return personalSettings.selected_org_id;
    } else {
      const orgId = joinedOrgId[0];
      const settings = {
        ...personalSettings,
        selected_org_id: orgId,
      };
      dispatch(setPersonalSettings(settings));
      dispatch(fetchAsyncUpdateSettings(settings));
      fetchInSequenceRelatedOrg();
      return orgId;
    }
  };

  const handleTogglePrivateModeChange = (target: TARGET) => {
    if (!loginUserInfo.joined_org.length) {
      // 設定に保持する organization に所属していない場合を考慮
      if (!personalSettings.private_mode) {
        const settings = { ...personalSettings, private_mode: true };
        dispatch(setPersonalSettings(settings));
        dispatch(fetchAsyncUpdateSettings(settings));
      }
      dispatch(
        setMessage(
          '現在プライベートモードしか利用できません。グループに参加するか、グループを作成してください。'
        )
      );
      dispatch(setMessageOpen(true));
      return;
    } else {
      const settings = {
        ...personalSettings,
        private_mode: Boolean(target.value),
      };
      dispatch(setPersonalSettings(settings));
      dispatch(fetchAsyncUpdateSettings(settings));
      fetchInSequenceRelatedOrg();
    }
  };

  const handleSelectChange = (target: TARGET) => {
    const settings = {
      ...personalSettings,
      selected_org_id: target.value.toString(),
    };
    dispatch(setPersonalSettings(settings));
    dispatch(fetchAsyncUpdateSettings(settings));
    fetchInSequenceRelatedOrg();
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
          onChange={handleTogglePrivateModeChange}
        />
        {!personalSettings.private_mode && (
          <CommonSelect
            label="グループを選択"
            options={orgOptions}
            name="selected_org_id"
            value={validateOrgId()}
            onChange={handleSelectChange}
          />
        )}
      </Paper>
    </Popover>
  );
};

export default SettingsMenu;
