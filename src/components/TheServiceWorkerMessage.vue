<script setup lang="ts">
import { messageFromServiceWorker, resetMessageFromServiceWorker } from '@/serviceWorker/registrationServiceWorker';
import BaseDefaultButton from './BaseDefaultButton.vue';
</script>

<template>
<div class="messageField" v-if="messageFromServiceWorker.length">
    <div class="messageWrapper">
        <h2 class="messageTitle">Уведомление</h2>
        <hr class="messageTitleLine">
        <p class="messageText">{{ messageFromServiceWorker }}</p>
        <BaseDefaultButton class="messageBtn" id="serviceWorkerMessageClosedBtn" @click="resetMessageFromServiceWorker">Хорошо</BaseDefaultButton>
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
    border: 3px solid #6688aa;
    background-color: #aaccee;
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
