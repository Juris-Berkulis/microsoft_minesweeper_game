<script setup lang="ts">
import { messageFromServiceWorker, resetMessageFromServiceWorker } from '@/serviceWorker/registrationServiceWorker';
</script>

<template>
<div class="messageField" v-if="messageFromServiceWorker.length">
    <div class="messageWrapper">
        <h2 class="messageTitle">Уведомление</h2>
        <hr class="messageTitleLine">
        <p class="messageText">{{ messageFromServiceWorker }}</p>
        <button class="button" @click="resetMessageFromServiceWorker">Хорошо</button>
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
    margin: 5px 0 10px;
    background-color: #6688aa;;
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
