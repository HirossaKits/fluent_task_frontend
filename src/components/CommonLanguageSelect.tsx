import React from 'react';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { TARGET } from '../features/types';

type Props = {
  value: string;
  onChange: Function;
  width?: string | number;
};

export default function CommonLanguageSelect(props: Props) {
  const styles = {
    autoComp: css`
      ${'width' in props ? `width: ${props.width};` : 'width: 196px;'}
    `,
  };

  const { t } = useTranslation();

  const handleSelectChange = (event: any, newItem: LanguageType) => {
    props.onChange(newItem.lang);
  };

  console.log(
    'test',
    languages.find((lang) => lang.lang === props.value)
  );

  return (
    <Autocomplete
      css={styles.autoComp}
      disableClearable
      options={languages}
      autoHighlight
      getOptionLabel={(option) => option.label}
      value={languages[1]}
      // value={languages.find((lang) => lang.lang === props.value)}
      onChange={(event, newItem) => handleSelectChange(event, newItem)}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="language"
          margin="normal"
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

interface LanguageType {
  lang: string;
  code: string;
  label: string;
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const languages: readonly LanguageType[] = [
  {
    lang: 'en',
    code: 'US',
    label: 'English',
  },
  // { code: 'CN', label: '中文' },
  {
    lang: 'ja',
    code: 'JP',
    label: 'Japanese',
  },
];
