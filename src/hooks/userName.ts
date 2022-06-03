import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface IUser {
  first_name: string;
  last_name: string;
}

export default function useConcatUserName() {
  const { t } = useTranslation();
  return useCallback(<T extends IUser | undefined>(user: T) => {
    if (user) {
      return `${user.last_name} ${user.first_name}`;
    } else {
      return t('user.unknownUser');
    }
  }, []);
}
