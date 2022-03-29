import React from 'react';
import { useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { setLang } from '../features/auth/authSlice';

interface LanguageType {
  lang: string;
  code: string;
  label: string;
}

type Props = {
  value: string;
  width?: string | number;
};

export default function CommonLanguageSelect(props: Props) {
  const styles = {
    autoComp: css`
      ${'width' in props ? `width: ${props.width};` : 'width: 196px;'}
    `,
  };

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const languages: readonly LanguageType[] = [
    {
      lang: 'en',
      code: 'US',
      label: t('langSelect.english') as string,
    },
    {
      lang: 'ja',
      code: 'JP',
      label: t('langSelect.japanese') as string,
    },
    // { code: 'CN', label: '中文' },
  ];

  const handleSelectChange = (event: any, newItem: LanguageType) => {
    i18n.changeLanguage(newItem.lang);
    dispatch(setLang(newItem.lang));
    localStorage.setItem('lang', newItem.lang);
  };

  return (
    <Autocomplete
      css={styles.autoComp}
      disableClearable
      options={languages}
      getOptionLabel={(option) => option.label}
      value={languages.find((lang) => lang.lang === props.value)}
      onChange={(event, newItem) => handleSelectChange(event, newItem)}
      renderOption={(props, option) => (
        <Box component='li' sx={{ '& > img': { mr: 2 } }} {...props}>
          <img
            loading='lazy'
            width='20'
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=''
          />
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant='standard'
          label={t('langSelect.selectLanguage')}
          margin='normal'
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off', // disable autocomplete and autofill
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
    />
  );
}
