import { defineStore } from "pinia";
import { reactive, toRef, type Ref } from 'vue';

interface SettingsSwitchers {
    isVibrationForFlags: boolean,
};

export const useSettingsSwitchersStore = defineStore('settingsSwitchers', () => {
    const settingsSwitchersDefault: SettingsSwitchers = {
        isVibrationForFlags: true,
    };

    const settingsSwitchers: SettingsSwitchers = reactive(JSON.parse(localStorage.getItem('settingsSwitchers') || JSON.stringify(settingsSwitchersDefault)));

    const isVibrationForFlags: Ref<boolean> = toRef(settingsSwitchers, 'isVibrationForFlags');

    const setIsVibrateForFlags = (): void => {
        settingsSwitchers.isVibrationForFlags = !settingsSwitchers.isVibrationForFlags;
        localStorage.setItem('settingsSwitchers', JSON.stringify(settingsSwitchers));
    };

    return {
        settingsSwitchers,
        isVibrationForFlags,
        setIsVibrateForFlags,
    }
});
