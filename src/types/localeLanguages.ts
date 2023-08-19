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
    theLanguageSelection_language: string,
    theLanguageSelection_changeTheLanguage: string,
    theLanguageSelection_cancel: string,
    theServiceWorkerMessage_notificationTitle: string,
    theServiceWorkerMessage_ok: string,
    theServiceWorkerMessage_updatesInstalled: string,
    theServiceWorkerMessage_appSavedForOffline: string,
    theServiceWorkerMessage_appSuccessfullyInstalled: string,
    theSettingsSwitchers_vibrationForFlags: string,
    theSettingsSwitchers_vibrationForFlags_message: string,
    theSettingsSwitchers_theFlagProtects: string,
    theSettingsSwitchers_soundsForExplosion: string,
    theSettingsSwitchers_soundsForOpenCell: string,
    theSettingsSwitchers_soundsForToggleFlag: string,
};

export type Locale = 'be_BY' | 'el_GR' | 'en_GB' | 'es_ES' | 'fr_FR' | 'hi_IN' | 'hu_HU' | 'it_IT' | 'kk_KZ' | 'ru_RU' | 'sr_RS' | 'tr_TR' |'zh_Hans_CN';

export type AllKitsOfTranslatedWords<K extends string> = {
    [key in K]: KitOfTranslatedWords
};

export interface AppLanguage {
    locale: Locale,
    language: string,
    localeLanguage: string,
};
