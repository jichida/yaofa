import { englishMessages } from 'admin-on-rest';
import chineseMessages from 'aor-language-chinese';

import customChineseMessages from './cn';
import customEnglishMessages from './en';

export default {
    cn: { ...chineseMessages, ...customChineseMessages },
    en: { ...englishMessages, ...customEnglishMessages },
};
