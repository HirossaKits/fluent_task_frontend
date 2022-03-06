import { useCallback } from 'react';

interface IUser {
  first_name: string;
  last_name: string;
}

export default function useConcatUserName() {
  return useCallback(<T extends IUser>(user: T) => {
    return `${user.last_name} ${user.first_name}`;
  }, []);
}
