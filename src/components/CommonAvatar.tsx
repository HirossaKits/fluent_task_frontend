import React from 'react';
import { css } from '@emotion/react';
import Avatar from '@mui/material/Avatar';
import { ORG_USER } from '../features/types';

type Props = {
  user: ORG_USER | undefined;
};

const CommonAvatar = (props: Props) => {
  const style = css`
    width: 100%;
    height: 100%;
    user-drag: none;
    -webkit-user-drag: none;
    -moz-user-select: none;
  `;

  return (
    <>
      {props.user ? (
        props.user.avatar_img ? (
          <Avatar>
            <img css={style} src={props.user.avatar_img} alt='avatar' />
          </Avatar>
        ) : (
          <Avatar>
            {props.user.last_name.slice(0, 1) +
              props.user.first_name.slice(0, 1)}
          </Avatar>
        )
      ) : (
        <Avatar />
      )}
    </>
  );
};

export default CommonAvatar;
