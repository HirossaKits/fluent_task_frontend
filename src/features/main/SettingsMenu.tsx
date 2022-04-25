import React from 'react';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import CommonSwitch from '../../components/CommonSwitch';
import { useSelector, useDispatch } from 'react-redux';
import { TARGET } from '../types';
import useCreateOption from '../../hooks/optionCreater';
import useMessage from '../../hooks/message';
import {
  selectLoginUserInfo,
  selectPersonalSettings,
  setPersonalSettings,
  fetchAsyncUpdateSettings,
  selectLang,
  selectDarkmode,
} from '../auth/authSlice';
import { fetchAsyncGetOrgInfo } from '../org/orgSliece';
import {
  selectSettingsMenuOpen,
  setMainComponentName,
  setSettingsMenuOpen,
} from './mainSlice';
import { fetchAsyncGetProject } from '../proj/projectSlice';
import {
  fetchAsyncGetTaskCategory,
  fetchAsyncGetTasks,
} from '../task/taskSlice';
import CommonSelect from '../../components/CommonSelect';
import LanguageSelect from '../../components/LanguageSelect';

type Props = {
  anchorEl: React.MutableRefObject<null>;
};

const SettingsMenu: React.FC<Props> = (props) => {
  const theme = useTheme();
  const styles = {
    paper: css`
      width: 244px;
      padding: ${theme.spacing(2)} ${theme.spacing(3)};
    `,
  };

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const createOption = useCreateOption();
  const message = useMessage();
  const loginUserInfo = useSelector(selectLoginUserInfo);
  const settingsMenuOpen = useSelector(selectSettingsMenuOpen);
  const personalSettings = useSelector(selectPersonalSettings);
  const lang = useSelector(selectLang);

  const orgOptions = createOption(
    loginUserInfo.joined_org?.filter((org) => org.is_private === false),
    'org_id',
    'org_name'
  );

  const fetchInSequenceRelatedOrg = async () => {
    await dispatch(fetchAsyncGetOrgInfo());
    await dispatch(fetchAsyncGetProject());
    await dispatch(fetchAsyncGetTaskCategory());
    await dispatch(fetchAsyncGetTasks());
  };

  const handleInputChange = (target: TARGET) => {
    const settings = { ...personalSettings, [target.name]: target.value };
    dispatch(setPersonalSettings(settings));
    dispatch(fetchAsyncUpdateSettings(settings));
  };

  // const validateOrgId = (org_id: string) => {
  //   const joinedOrgId = loginUserInfo.joined_org.map((org) => org.org_id);
  //   // settings の selected_org_id に所属している場合
  //   if (joinedOrgId.includes(org_id)) {
  //     return org_id;
  //   }
  //   // settings の selected_org_id に所属していない場合
  //   else {
  //     const alter_org_id = joinedOrgId[0];
  //     const settings = {
  //       ...personalSettings,
  //       selected_org_id: alter_org_id,
  //     };
  //     dispatch(setPersonalSettings(settings));
  //     dispatch(fetchAsyncUpdateSettings(settings));
  //     fetchInSequenceRelatedOrg();
  //     return alter_org_id;
  //   }
  // };

  const handleTogglePrivateModeChange = (target: TARGET) => {
    if (
      !loginUserInfo.joined_org?.filter((org) => org.is_private === false)
        .length
    ) {
      // organization に所属していない場合、強制的に private に変更
      if (!personalSettings.private_mode) {
        const settings = {
          ...personalSettings,
          private_mode: true,
          selected_org_id:
            loginUserInfo.joined_org?.find((org) => org.is_private)?.org_id ??
            '',
        };
        dispatch(setPersonalSettings(settings));
        dispatch(fetchAsyncUpdateSettings(settings));
      }
      message(t('settings.cannotUseGroup'));
      return;
    } else {
      const settings = {
        ...personalSettings,
        private_mode: Boolean(target.value),
        selected_org_id:
          loginUserInfo.joined_org?.find(
            (org) => org.is_private === target.value
          )?.org_id ?? '',
      };
      dispatch(setPersonalSettings(settings));
      dispatch(fetchAsyncUpdateSettings(settings));
      fetchInSequenceRelatedOrg().then(() => {
        if (target.value) dispatch(setMainComponentName('Proj'));
      });
    }
  };

  const handleSelectChange = (target: TARGET) => {
    if (target.value) {
      const settings = {
        ...personalSettings,
        selected_org_id: target.value.toString(),
      };
      dispatch(setPersonalSettings(settings));
      dispatch(fetchAsyncUpdateSettings(settings));
      fetchInSequenceRelatedOrg();
    }
  };

  const handleColse = () => {
    dispatch(setSettingsMenuOpen(false));
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
        {/* <CommonSwitch
          label={t('settings.darkMode')}
          labelWidth={10}
          name='dark_mode'
          value={darkMode}
          onChange={handleInputChange}
        /> */}
        <CommonSwitch
          label={t('settings.tooltip')}
          labelWidth={10}
          name="tooltip"
          value={personalSettings.tooltip}
          onChange={handleInputChange}
        />
        <CommonSwitch
          label={t('settings.privateMode')}
          labelWidth={10}
          name="private_mode"
          value={personalSettings.private_mode}
          onChange={handleTogglePrivateModeChange}
        />
        {!personalSettings.private_mode && (
          <CommonSelect
            label={t('settings.selectGroup')}
            options={orgOptions}
            name="selected_org_id"
            value={personalSettings.selected_org_id}
            onChange={handleSelectChange}
          />
        )}
        <LanguageSelect value={lang} />
      </Paper>
    </Popover>
  );
};

export default SettingsMenu;
