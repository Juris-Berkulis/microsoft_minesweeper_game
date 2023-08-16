export interface KitOfTranslatedWords {
    settingsView_backInTheField: string,
    boseCopy_shareAppLink: string,
    boseCopy_linkCopiedToClipboard: string,
    boseCopy_linkCopyError: string,
    theFieldManager_options: string,
    theFieldManager_title: string,
    theFieldManager_settings: string,
    theFieldManager_newGame: string,
    theFieldManager_install: string,
    theFieldSize_numberOfCellsInWidth: string,
    theFieldSize_numberOfCellsInHeight: string,
    theFieldSize_probabilityOfMineAppearingInACell: string,
    theFieldSize_save: string,
    theSettingsSwitchers_vibrationForFlags: string,
    theSettingsSwitchers_vibrationForFlags_message: string,
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
