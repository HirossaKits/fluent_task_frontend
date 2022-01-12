import React from 'react';
import { css } from '@emotion/react';
import { Typography } from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

type Props = {
  children: string | JSX.Element;
};

const CommonTypography = (props: Props) => {
  return <Typography sx={{ marginTop: 2 }}>{props.children}</Typography>;
};

export default CommonTypography;
