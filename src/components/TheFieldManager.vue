<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { isShowBtnForInstallPWA, installTheAppAsPWA } from '@/serviceWorker/registrationServiceWorker';
import BaseDefaultButton from './BaseDefaultButton.vue';
import { useLanguageSelectionStore } from '@/stores/languageSelection';

const {
    getTranslation,
} = useLanguageSelectionStore();

const isShow: Ref<boolean> = ref(false);

const toggleOptions = (): void => {
    isShow.value = !isShow.value
};

const emit = defineEmits();

const newGame = ():void => {
    emit('newGame');
    toggleOptions();
};
</script>

<template>
<div class="fieldManager" :class="{fieldManager_closed: !isShow}">
    <div class="lever">
        <button class="leverBtn" id="toggleFieldManager" @click="toggleOptions">{{ getTranslation('theFieldManager_options') }}</button>
    </div>
    <div class="optionsWrapper">
        <h1 class="title">{{ getTranslation('theFieldManager_title') }}</h1>
        <div class="options">
            <BaseDefaultButton 
                id="settingsView" 
                :to="'/settings'"
            >{{ getTranslation('theFieldManager_settings') }}</BaseDefaultButton>
            <BaseDefaultButton 
                id="newGameBtn" 
                @click="newGame"
            >{{ getTranslation('theFieldManager_newGame') }}</BaseDefaultButton>
            <BaseDefaultButton 
                id="btnForAppInstallingAsPWA" 
                v-if="isShowBtnForInstallPWA" 
                @click="installTheAppAsPWA"
            >{{ getTranslation('theFieldManager_install') }}</BaseDefaultButton>
        </div>
    </div>
</div>
</template>

<style scoped>
.fieldManager {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 15px;
    display: flex;
    justify-content: center;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: #aaccee;
    box-shadow: 0 0 15px 0 #000000, inset 0 7.5px 15px 0 #b5d5ee;
    transform: translateY(0);
    transition: all 0.4s ease-in-out 0s;
}

@media (((max-width: 450px) and (max-height: 300px)) or (max-width: 250px)) {
    .fieldManager {
        padding: 5px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        box-shadow: 0 0 5px 0 #000000, inset 0 2.5px 5px 0 #b5d5ee;
    }
}

.fieldManager.fieldManager_closed {
    transform: translateY(100%);
}

.lever {
    position: absolute;
    right: 15px;
    bottom: 100%;
    pointer-events: none;
}

@media (((max-width: 450px) and (max-height: 300px)) or (max-width: 250px)) {
    .lever {
        right: 5px;
    }
}

.leverBtn {
    padding: 5px 15px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: #aaccee;
    box-shadow: 0 -7.5px 15px -7.5px #000000, inset 0 0 15px 0 #b5d5ee;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1;
    color: #000000;
    pointer-events: fill;
}

@media (((max-width: 450px) and (max-height: 300px)) or (max-width: 250px)) {
    .leverBtn {
        padding: 2px 5px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        box-shadow: 0 -2.5px 5px -2.5px #000000, inset 0 0 5px 0 #b5d5ee;
        font-size: 0.5rem;
    }
}

.optionsWrapper {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.title {
    padding-bottom: 10px;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: #000000;
}

@media (((max-width: 450px) and (max-height: 300px)) or (max-width: 250px)) {
    .title {
        font-size: 1rem;
    }
}

.options {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 1em;
}

@media (((max-width: 450px) and (max-height: 300px)) or (max-width: 250px)) {
    .options {
        font-size: 0.5em;
    }
}
</style>
