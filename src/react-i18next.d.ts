import 'react-i18next';
import enTrans from './locales/en/translation.json';
import jaTrans from './locales/ja/translation.json';

declare module 'react-i18next' {
  interface Resources {
    en: typeof enTrans;
    ja: typeof jaTrans;
  }
}

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      en: typeof enTrans;
      ja: typeof jaTrans;
    };
  }
}
