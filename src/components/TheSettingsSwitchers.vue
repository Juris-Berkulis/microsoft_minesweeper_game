<script setup lang="ts">
import { storeToRefs } from 'pinia';
import BaseSettingsSwitcher from './BaseSettingsSwitcher.vue';
import { useSettingsSwitchersStore } from '@/stores/settingsSwitchers';
import { useLanguageSelectionStore } from '@/stores/languageSelection';

const settingsSwitchersStore = useSettingsSwitchersStore();

const {
    setIsVibrateForFlags,
    setIsFlagProtectsCellFromAccidentalClick,
    setIsSoundPowerForExplosion,
    setIsSoundPowerForOpenCell,
    setIsSoundPowerForToggleFlag,
} = useSettingsSwitchersStore();

const {
    isVibrationForFlags,
    isFlagProtectsCellFromAccidentalClick,
    isSoundPowerForExplosion,
    isSoundPowerForOpenCell,
    isSoundPowerForToggleFlag,
} = storeToRefs(settingsSwitchersStore);

const {
    getTranslation,
} = useLanguageSelectionStore();
</script>

<template>
<div class="swirchersWrapper">
    <BaseSettingsSwitcher 
        :isPower="isVibrationForFlags" 
        :togglePower="setIsVibrateForFlags" 
        :mainText="getTranslation('theSettingsSwitchers_vibrationForFlags')" 
        :description="getTranslation('theSettingsSwitchers_vibrationForFlags_message')"
    ></BaseSettingsSwitcher>
    <BaseSettingsSwitcher 
        :isPower="isFlagProtectsCellFromAccidentalClick" 
        :togglePower="setIsFlagProtectsCellFromAccidentalClick" 
        :mainText="getTranslation('theSettingsSwitchers_theFlagProtects')" 
    ></BaseSettingsSwitcher>
    <BaseSettingsSwitcher 
        :isPower="isSoundPowerForExplosion" 
        :togglePower="setIsSoundPowerForExplosion" 
        :mainText="getTranslation('theSettingsSwitchers_soundsForExplosion')" 
    ></BaseSettingsSwitcher>
    <BaseSettingsSwitcher 
        :isPower="isSoundPowerForOpenCell" 
        :togglePower="setIsSoundPowerForOpenCell" 
        :mainText="getTranslation('theSettingsSwitchers_soundsForOpenCell')" 
    ></BaseSettingsSwitcher>
    <BaseSettingsSwitcher 
        :isPower="isSoundPowerForToggleFlag" 
        :togglePower="setIsSoundPowerForToggleFlag" 
        :mainText="getTranslation('theSettingsSwitchers_soundsForToggleFlag')" 
    ></BaseSettingsSwitcher>
</div>
</template>

<style scoped>
.swirchersWrapper {
    width: 100%;
}
</style>
