import React from 'react';
import { Typography } from '@mui/material';

type Props = {
  children: string | JSX.Element;
};

const CommonTypography = (props: Props) => {
  return <Typography sx={{ marginTop: 2 }}>{props.children}</Typography>;
};

export default CommonTypography;
