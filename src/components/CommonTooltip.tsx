import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { selectTooltip } from '../features/auth/authSlice';

type Props = {
  title: string;
  children: JSX.Element;
};

const CustomizedTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[2],
    fontSize: 11,
  },
}));

const CommonTooltip = (props: Props) => {
  const visible = useSelector(selectTooltip);
  return visible ? (
    <CustomizedTooltip title={props.title}>{props.children}</CustomizedTooltip>
  ) : (
    <>{props.children}</>
  );
};

export default CommonTooltip;
