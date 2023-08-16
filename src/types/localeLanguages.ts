export interface KitOfTranslatedWords {
    theFieldManager_options: string,
    theSettingsSwitchers_theFlagProtects: string,
};

export type Locale = 'en_US' | 'ru_RU';

export type AllKitsOfTranslatedWords<K extends string> = {
    [key in K]: KitOfTranslatedWords
};

export interface AppLanguage {
    locale: Locale,
    language: string,
};
