<script setup lang="ts">
import { ref, type Ref } from 'vue';

const isShow: Ref<boolean> = ref(false)

const emit = defineEmits();

const newGame = ():void => {
    emit('newGame');
};

const toggleOptions = (): void => {
    isShow.value = !isShow.value
};
</script>

<template>
<div class="fieldManager" :class="{fieldManager_closed: !isShow}">
    <div class="lever">
        <button class="leverBtn" @click="toggleOptions">Опции</button>
    </div>
    <div class="optionsWrapper">
        <h1 class="title">Minesweeper</h1>
        <div class="options">
            <button class="button" @click="newGame">Новая игра</button>
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
    border: 1px solid #000000;
    border-bottom: none;
    background-color: #aaccee;
    transform: translateY(0);
    transition: all 0.4s ease-in-out 0s;
}

@media ((max-width: 450px) and (max-height: 300px)) {
    .fieldManager {
        padding: 5px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
}

.fieldManager.fieldManager_closed {
    transform: translateY(100%);
}

.lever {
    position: absolute;
    right: 3vw;
    bottom: 100%;
    pointer-events: none;
}

.leverBtn {
    padding: 5px 15px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border: 1px solid #000000;
    background-color: #aaccee;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    color: #000000;
    pointer-events: fill;
}

@media ((max-width: 450px) and (max-height: 300px)) {
    .leverBtn {
        padding: 2px 5px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
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

.options {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.button {
    padding: 8px 15px;
    border-radius: 15px;
    background-color: #449944;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    color: #ffffff;
}

@media ((max-width: 450px) and (max-height: 300px)) {
    .button {
        padding: 5px;
        font-size: 0.5rem;
    }
}

.button:hover {
    background-color: #227722;
}
</style>
