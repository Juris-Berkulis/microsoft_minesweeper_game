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
    };

    //* Флаг защищает ячейку от случайного нажатия:
    const isFlagProtectsCellFromAccidentalClick: Ref<boolean> = settingsSwitchers.isFlagProtectsCellFromAccidentalClick !== undefined ? toRef(settingsSwitchers, 'isFlagProtectsCellFromAccidentalClick') : ref(settingsSwitchersDefault.isFlagProtectsCellFromAccidentalClick);

    const setIsFlagProtectsCellFromAccidentalClick = (): void => {
        isFlagProtectsCellFromAccidentalClick.value = !isFlagProtectsCellFromAccidentalClick.value;
        localStorage.setItem('settingsSwitchers', JSON.stringify({...settingsSwitchers, isFlagProtectsCellFromAccidentalClick: isFlagProtectsCellFromAccidentalClick.value}));
    };

    return {
        settingsSwitchers,
        isVibrationForFlags,
        setIsVibrateForFlags,
        isFlagProtectsCellFromAccidentalClick,
        setIsFlagProtectsCellFromAccidentalClick,
    }
});
