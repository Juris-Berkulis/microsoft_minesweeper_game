import { sendActionIntoGoogleAnalytics } from "@/analytics/GoogleAnalytics";
import { defineStore } from "pinia";
import { reactive, ref, toRef, type Ref } from 'vue';

interface SettingsSwitchers {
    isVibrationForFlags: boolean,
    isFlagProtectsCellFromAccidentalClick: boolean,
    isSoundPowerForExplosion: boolean,
    isSoundPowerForOpenCell: boolean,
    isSoundPowerForToggleFlag: boolean,
};

export const useSettingsSwitchersStore = defineStore('settingsSwitchers', () => {
    const settingsSwitchersDefault: SettingsSwitchers = {
        isVibrationForFlags: true,
        isFlagProtectsCellFromAccidentalClick: true,
        isSoundPowerForExplosion: true,
        isSoundPowerForOpenCell: false,
        isSoundPowerForToggleFlag: false,
    };

    //* Весь объект настроек:
    const settingsSwitchers: SettingsSwitchers = reactive(JSON.parse(localStorage.getItem('settingsSwitchers') || '{}'));

    //* Вибрация при установке и удалении флагов:
    const isVibrationForFlags: Ref<boolean> = settingsSwitchers.isVibrationForFlags !== undefined ? toRef(settingsSwitchers, 'isVibrationForFlags') : ref(settingsSwitchersDefault.isVibrationForFlags);

    const setIsVibrateForFlags = (): void => {
        isVibrationForFlags.value = !isVibrationForFlags.value;
        localStorage.setItem('settingsSwitchers', JSON.stringify({...settingsSwitchers, isVibrationForFlags: isVibrationForFlags.value}));
        sendActionIntoGoogleAnalytics(
            isVibrationForFlags.value ? 'vibrationForFlagsIsEnabled' : 'vibrationForFlagsIsDisabled',
            'switcher',
            isVibrationForFlags.value ? 'vibration_for_flags_is_enabled' : 'vibration_for_flags_is_disabled',
        );
    };

    //* Флаг защищает ячейку от случайного нажатия:
    const isFlagProtectsCellFromAccidentalClick: Ref<boolean> = settingsSwitchers.isFlagProtectsCellFromAccidentalClick !== undefined ? toRef(settingsSwitchers, 'isFlagProtectsCellFromAccidentalClick') : ref(settingsSwitchersDefault.isFlagProtectsCellFromAccidentalClick);

    const setIsFlagProtectsCellFromAccidentalClick = (): void => {
        isFlagProtectsCellFromAccidentalClick.value = !isFlagProtectsCellFromAccidentalClick.value;
        localStorage.setItem('settingsSwitchers', JSON.stringify({...settingsSwitchers, isFlagProtectsCellFromAccidentalClick: isFlagProtectsCellFromAccidentalClick.value}));
        sendActionIntoGoogleAnalytics(
            isFlagProtectsCellFromAccidentalClick.value ? 'cellProtectionByFlagIsEnabled' : 'cellProtectionByFlagIsDisabled',
            'switcher',
            isFlagProtectsCellFromAccidentalClick.value ? 'cell_protection_by_flag_is_enabled' : 'cell_protection_by_flag_is_disabled',
        );
    };

    //* Звук при взрыве:
    const isSoundPowerForExplosion: Ref<boolean> = settingsSwitchers.isSoundPowerForExplosion !== undefined ? toRef(settingsSwitchers, 'isSoundPowerForExplosion') : ref(settingsSwitchersDefault.isSoundPowerForExplosion);

    const setIsSoundPowerForExplosion = (): void => {
        isSoundPowerForExplosion.value = !isSoundPowerForExplosion.value;
        localStorage.setItem('settingsSwitchers', JSON.stringify({...settingsSwitchers, isSoundPowerForExplosion: isSoundPowerForExplosion.value}));
        sendActionIntoGoogleAnalytics(
            isSoundPowerForExplosion.value ? 'soundPowerForExplosionIsEnabled' : 'soundPowerForExplosionIsDisabled',
            'switcher',
            isSoundPowerForExplosion.value ? 'sound_power_for_explosion_is_enabled' : 'sound_power_for_explosion_is_disabled',
        );
    };

    //* Звук при открытии ячейки:
    const isSoundPowerForOpenCell: Ref<boolean> = settingsSwitchers.isSoundPowerForOpenCell !== undefined ? toRef(settingsSwitchers, 'isSoundPowerForOpenCell') : ref(settingsSwitchersDefault.isSoundPowerForOpenCell);

    const setIsSoundPowerForOpenCell = (): void => {
        isSoundPowerForOpenCell.value = !isSoundPowerForOpenCell.value;
        localStorage.setItem('settingsSwitchers', JSON.stringify({...settingsSwitchers, isSoundPowerForOpenCell: isSoundPowerForOpenCell.value}));
        sendActionIntoGoogleAnalytics(
            isSoundPowerForOpenCell.value ? 'soundPowerForOpenCellIsEnabled' : 'soundPowerForOpenCellIsDisabled',
            'switcher',
            isSoundPowerForOpenCell.value ? 'sound_power_for_open_cell_is_enabled' : 'sound_power_for_open_cell_is_disabled',
        );
    };

    //* Звук при переключении флага:
    const isSoundPowerForToggleFlag: Ref<boolean> = settingsSwitchers.isSoundPowerForToggleFlag !== undefined ? toRef(settingsSwitchers, 'isSoundPowerForToggleFlag') : ref(settingsSwitchersDefault.isSoundPowerForToggleFlag);

    const setIsSoundPowerForToggleFlag = (): void => {
        isSoundPowerForToggleFlag.value = !isSoundPowerForToggleFlag.value;
        localStorage.setItem('settingsSwitchers', JSON.stringify({...settingsSwitchers, isSoundPowerForToggleFlag: isSoundPowerForToggleFlag.value}));
        sendActionIntoGoogleAnalytics(
            isSoundPowerForToggleFlag.value ? 'soundPowerForToggleFlagIsEnabled' : 'soundPowerForToggleFlagIsDisabled',
            'switcher',
            isSoundPowerForToggleFlag.value ? 'sound_power_for_toggle_flag_is_enabled' : 'sound_power_for_toggle_flag_is_disabled',
        );
    };

    return {
        settingsSwitchers,
        isVibrationForFlags,
        setIsVibrateForFlags,
        isFlagProtectsCellFromAccidentalClick,
        setIsFlagProtectsCellFromAccidentalClick,
        isSoundPowerForExplosion,
        setIsSoundPowerForExplosion,
        isSoundPowerForOpenCell,
        setIsSoundPowerForOpenCell,
        isSoundPowerForToggleFlag,
        setIsSoundPowerForToggleFlag,
    }
});
