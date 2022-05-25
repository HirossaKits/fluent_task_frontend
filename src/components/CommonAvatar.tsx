import React from 'react';
import { css } from '@emotion/react';
import Avatar from '@mui/material/Avatar';
import { USER_INFO } from '../features/types';

type Props = {
  user: USER_INFO | undefined;
  width?: string;
  fontSize?: string;
};

const CommonAvatar = (props: Props) => {
  const styles = {
    avatar: css`
      ${'width' in props && `width: ${props.width}`};
      ${'width' in props && `height: ${props.width}`};
      ${'fontSize' in props && `font-size: ${props.fontSize};`}
    `,
    img: css`
      width: 100%;
      height: 100%;
      user-drag: none;
      -webkit-user-drag: none;
      -moz-user-select: none;
    `,
  };

  console.log(props.user);

  return (
    <>
      {props.user ? (
        props.user.avatar_img ? (
          <Avatar css={styles.avatar}>
            <img css={styles.img} src={props.user.avatar_img} alt="avatar" />
          </Avatar>
        ) : (
          <Avatar css={styles.avatar}>
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
