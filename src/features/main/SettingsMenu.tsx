import React, { useCallback, useEffect } from 'react';
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
import useChangeOrgBootLoader from '../../hooks/changeOrgBootLoader';
import {
  selectLoginUserInfo,
  selectPersonalSettings,
  setPersonalSettings,
  fetchAsyncUpdateSettings,
  selectLang,
  fetchAsyncGetLoginUser,
} from '../auth/authSlice';
import {
  selectSettingsMenuOpen,
  setMainComponentName,
  setSettingsMenuOpen,
} from './mainSlice';
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
  const changeOrgBootLoad = useChangeOrgBootLoader();
  const loginUserInfo = useSelector(selectLoginUserInfo);
  const settingsMenuOpen = useSelector(selectSettingsMenuOpen);
  const personalSettings = useSelector(selectPersonalSettings);
  const lang = useSelector(selectLang);

  const orgOptions = createOption(
    loginUserInfo.joined_org?.filter((org) => org.is_private === false),
    'org_id',
    'org_name'
  );

  const updateSettings = useCallback((settings) => {
    dispatch(setPersonalSettings(settings));
    dispatch(fetchAsyncUpdateSettings(settings));
  }, []);

  // useEffect(() => {
  //   console.log('useEffect!');
  //   // privateモードの場合は何もしない
  //   if (personalSettings.private_mode) {
  //     console.log('???');
  //     return;
  //   }
  //   console.log('useEffect2!');

  //   const publicOrgId = loginUserInfo.joined_org.reduce(
  //     (pre: string[], cur) => (!cur.is_private ? [...pre, cur.org_id] : pre),
  //     []
  //   );
  //   console.log('publicOrgId', publicOrgId);

  //   // public な組織に所属していない場合
  //   if (!publicOrgId.length) {
  //     const privateOrgId = loginUserInfo.joined_org?.find(
  //       (org) => org.is_private
  //     )?.org_id;
  //     updateSettings({
  //       ...personalSettings,
  //       private_mode: true,
  //       selected_org_id: privateOrgId,
  //     });
  //     changeOrgBootLoad();
  //   }

  //   console.log('selectedOrgId', personalSettings.selected_org_id);
  //   // settings の selected_org_id に所属している場合
  //   if (publicOrgId.includes(personalSettings.selected_org_id)) {
  //     return;
  //   }

  //   // settings の selected_org_id に所属していない場合
  //   else {
  //     updateSettings({
  //       ...personalSettings,
  //       selected_org_id: publicOrgId[0],
  //     });
  //     changeOrgBootLoad();
  //   }
  // }, [dispatch]);

  const handleInputChange = (target: TARGET) => {
    const settings = { ...personalSettings, [target.name]: target.value };
    updateSettings(settings);
  };

  const handleTogglePrivateModeChange = (target: TARGET) => {
    const isNotJoinedPublicOrg =
      loginUserInfo.joined_org?.find((org) => org.is_private === false) ===
      undefined;
    if (isNotJoinedPublicOrg) {
      // organization に所属していない場合、強制的に private に変更
      if (!personalSettings.private_mode) {
        updateSettings({
          ...personalSettings,
          private_mode: true,
          selected_org_id: loginUserInfo.joined_org?.find(
            (org) => org.is_private
          )?.org_id,
        });
      }
      message(t('settings.cannotUseGroup'));
      return;
    } else {
      updateSettings({
        ...personalSettings,
        private_mode: Boolean(target.value),
        selected_org_id:
          loginUserInfo.joined_org?.find(
            (org) => org.is_private === target.value
          )?.org_id ?? '',
      });

      changeOrgBootLoad();

      if (target.value) {
        dispatch(setMainComponentName('Proj'));
      }
    }
  };

  const handleSelectChange = (target: TARGET) => {
    dispatch(fetchAsyncGetLoginUser());

    const publicOrgId = loginUserInfo.joined_org
      .filter((org) => org.is_private === false)
      .map((org) => org.org_id);

    if (publicOrgId.length === 0) {
      updateSettings({
        ...personalSettings,
        private_mode: true,
        selected_org_id:
          loginUserInfo.joined_org?.find(
            (org) => org.is_private === target.value
          )?.org_id ?? '',
      });

      changeOrgBootLoad();

      return;
    }

    if (publicOrgId.includes(target.value as string)) {
      updateSettings({
        ...personalSettings,
        selected_org_id: target.value,
      });
    } else {
      updateSettings({
        ...personalSettings,
        selected_org_id: publicOrgId[0],
      });
    }

    changeOrgBootLoad();
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
