import React from 'react';
import Avatar from '@mui/material/Avatar';
import { ORG_USER } from '../features/types';

type Props = {
  user: ORG_USER | undefined;
};

const CommonAvatar = (props: Props) => {
  console.log(props.user);

  return (
    <>
      {props.user ? (
        props.user.avatar_img ? (
          <Avatar src={props.user.avatar_img} />
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
