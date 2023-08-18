<script setup lang="ts">
import { 
    keyForMessageFromServiceWorker, 
    resetKeyForMessageFromServiceWorker 
} from '@/serviceWorker/registrationServiceWorker';
import BaseDefaultButton from './BaseDefaultButton.vue';
import { useLanguageSelectionStore } from '@/stores/languageSelection';

const {
    getTranslation,
} = useLanguageSelectionStore();
</script>

<template>
<div class="messageField" v-if="keyForMessageFromServiceWorker">
    <div class="messageWrapper">
        <h2 class="messageTitle">{{ getTranslation('theServiceWorkerMessage_notificationTitle') }}</h2>
        <hr class="messageTitleLine">
        <p class="messageText">{{ getTranslation(keyForMessageFromServiceWorker) }}</p>
        <BaseDefaultButton 
            class="messageBtn" 
            id="serviceWorkerMessageClosedBtn" 
            @click="resetKeyForMessageFromServiceWorker"
        >{{ getTranslation('theServiceWorkerMessage_ok') }}</BaseDefaultButton>
    </div>
</div>
</template>

<style scoped>
.messageField {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    font-size: 1rem;
    z-index: 90;
    user-select: none;
}

@media ((max-width: 450px) or (max-height: 450px)) {
    .messageField {
        font-size: 0.7rem;
    }
}

.messageWrapper {
    max-height: 80vh;
    width: 100%;
    max-width: 400px;
    padding: 1em;
    overflow: auto;
    border-radius: 1em;
    background-color: #aaccee;
    box-shadow: 0 0 1em 0 #000000, inset 0 0 1em 0 #b5d5ee;
}

.messageTitle {
    font-size: 1.2em;
    font-weight: 700;
    line-height: 1.15;
    color: #000000;
    text-align: center;
}

.messageTitleLine {
    height: 1px;
    width: 100%;
    margin: 3px 0 12px;
    background-color: #6688aa;
    border: none;
}

.messageText {
    margin-bottom: 15px;
    font-size: 1em;
    font-weight: 700;
    line-height: 1.15;
    color: #000000;
}

.messageBtn {
    display: block;
    margin-left: auto;
}
</style>
