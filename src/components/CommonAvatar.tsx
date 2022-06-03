import React from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/react';
import Avatar from '@mui/material/Avatar';
import { USER_INFO } from '../features/types';
import { selectSelectedProjectMember } from '../features/proj/projectSlice';

type Props = {
  user?: USER_INFO | undefined;
  userId?: string | null;
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

  const projectMember = useSelector(selectSelectedProjectMember);

  if (props.hasOwnProperty('user')) {
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
  } else if (props.hasOwnProperty('userId')) {
    const user = projectMember?.find((user) => user.user_id === props.userId);
    return (
      <>
        {user ? (
          user.avatar_img ? (
            <Avatar css={styles.avatar}>
              <img css={styles.img} src={user.avatar_img} alt="avatar" />
            </Avatar>
          ) : (
            <Avatar css={styles.avatar}>
              {user.last_name.slice(0, 1) + user.first_name.slice(0, 1)}
            </Avatar>
          )
        ) : (
          <Avatar css={styles.avatar} />
        )}
      </>
    );
  } else {
    return <></>;
  }
};

export default CommonAvatar;
