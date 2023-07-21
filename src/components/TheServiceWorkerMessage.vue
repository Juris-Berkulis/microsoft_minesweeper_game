<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useServiceWorkerStore } from '@/stores/serviceWorker';
import { messageFromServiceWorker } from '@/serviceWorker/registrationServiceWorker';
import { watch } from 'vue';

const serviceWorkerStore = useServiceWorkerStore();

const {
    toggleIsShowMessage,
    setServiceWorkerMessage,
} = useServiceWorkerStore();

const {
    isShowMessage,
    serviceWorkerMessage,
} = storeToRefs(serviceWorkerStore);

watch(messageFromServiceWorker, () => {
    setServiceWorkerMessage(messageFromServiceWorker.value);
});
</script>

<template>
<div class="messageField" v-if="isShowMessage">
    <div class="messageWrapper">
        <p class="messageText">{{ serviceWorkerMessage }}</p>
        <button class="button" @click="toggleIsShowMessage(false)">Хорошо</button>
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
}

@media ((max-width: 450px) or (max-height: 450px)) {
    .messageField {
        font-size: 0.5rem;
    }
}

.messageWrapper {
    width: 100%;
    max-width: 400px;
    padding: 16px;
    border-radius: 1em;
    border: 3px solid #6688aa;
    background-color: #aaccee;
}

.messageText {
    margin-bottom: 15px;
    font-size: 1em;
    font-weight: 700;
    line-height: 1.15;
    color: #000000;
}

.button {
    display: block;
    margin-left: auto;
    padding: 0.5em 1em;
    border-radius: 1em;
    background-color: #449944;
    font-size: 1em;
    font-weight: 400;
    line-height: 1;
    color: #ffffff;
}

.button:hover {
    background-color: #227722;
}
</style>
