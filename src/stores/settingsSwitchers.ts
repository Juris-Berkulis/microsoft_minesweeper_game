import { defineStore } from "pinia";
import { reactive, toRef, type Ref } from 'vue';

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
    const settingsSwitchers: SettingsSwitchers = reactive(JSON.parse(localStorage.getItem('settingsSwitchers') || JSON.stringify(settingsSwitchersDefault)));

    //* Вибрация при установке и удалении флагов:
    const isVibrationForFlags: Ref<boolean> = toRef(settingsSwitchers, 'isVibrationForFlags');

    const setIsVibrateForFlags = (): void => {
        isVibrationForFlags.value = !isVibrationForFlags.value;
        localStorage.setItem('settingsSwitchers', JSON.stringify(settingsSwitchers));
    };

    //* Флаг защищает ячейку от случайного нажатия:
    const isFlagProtectsCellFromAccidentalClick: Ref<boolean> = toRef(settingsSwitchers, 'isFlagProtectsCellFromAccidentalClick');

    const setIsFlagProtectsCellFromAccidentalClick = (): void => {
        isFlagProtectsCellFromAccidentalClick.value = !isFlagProtectsCellFromAccidentalClick.value;
        localStorage.setItem('settingsSwitchers', JSON.stringify(settingsSwitchers));
    };

    return {
        settingsSwitchers,
        isVibrationForFlags,
        setIsVibrateForFlags,
        isFlagProtectsCellFromAccidentalClick,
        setIsFlagProtectsCellFromAccidentalClick,
    }
});
