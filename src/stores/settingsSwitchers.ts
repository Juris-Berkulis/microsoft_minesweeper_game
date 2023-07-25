import { sendActionIntoGoogleAnalytics } from "@/analytics/GoogleAnalytics";
import { defineStore } from "pinia";
import { reactive, ref, toRef, type Ref } from 'vue';

interface SettingsSwitchers {
    isVibrationForFlags: boolean,
    isFlagProtectsCellFromAccidentalClick: boolean,
};

export const useSettingsSwitchersStore = defineStore('settingsSwitchers', () => {
    const settingsSwitchersDefault: SettingsSwitchers = {
        isVibrationForFlags: true,
        isFlagProtectsCellFromAccidentalClick: true,
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
            'switch',
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
            'switch',
            isFlagProtectsCellFromAccidentalClick.value ? 'cell_protection_by_flag_is_enabled' : 'cell_protection_by_flag_is_disabled',
        );
    };

    return {
        settingsSwitchers,
        isVibrationForFlags,
        setIsVibrateForFlags,
        isFlagProtectsCellFromAccidentalClick,
        setIsFlagProtectsCellFromAccidentalClick,
    }
});
