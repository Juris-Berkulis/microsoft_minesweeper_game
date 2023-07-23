<script setup lang="ts">
import { storeToRefs } from 'pinia';
import BaseSettingsSwitcher from './BaseSettingsSwitcher.vue';
import { useSettingsSwitchersStore } from '@/stores/settingsSwitchers';

const settingsSwitchersStore = useSettingsSwitchersStore();

const {
    setIsVibrateForFlags,
} = useSettingsSwitchersStore();

const {
    isVibrationForFlags,
} = storeToRefs(settingsSwitchersStore);
</script>

<template>
<div class="swirchersWrapper">
    <BaseSettingsSwitcher 
        :isPower="isVibrationForFlags" 
        :togglePower="setIsVibrateForFlags" 
        :mainText="'Вибриция при установке и удалении флагов'" 
        :description="'Работает только на устройствах, имеющих вибрацию (вибрация должна быть активирована в настройках устройства).'"
    ></BaseSettingsSwitcher>
</div>
</template>

<style scoped>
.swirchersWrapper {
    width: 100%;
}
</style>
