<script setup lang="ts">

interface Props {
    isPower: boolean | undefined,
    togglePower: () => void,
    mainText: string,
    description?: string,
};

defineProps<Props>();
</script>

<template>
<div class="switcherContainer">
    <div class="switcerMain">
        <p class="switcerText">{{ mainText }}</p>
        <div class="swither" :class="{swither_on: isPower}" @click="togglePower">
            <div class="switherLever" :class="{switherLever_on: isPower}"></div>
        </div>
    </div>
    <p class="switherDescription" v-if="description">{{ description }}</p>
</div>
</template>

<style scoped>
.switcherContainer {
    width: 100%;
    margin: 10px 0;
}

.switcerMain {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.switcerText {
    font-size: 1em;
    font-weight: 400;
    line-height: 1.15;
    color: #000000;
}

.swither {
    position: relative;
    height: 1.25em;
    width: 2.5em;
    min-width: 2.5em;
    margin-left: 10px;
    background-color: #ff0000;
    border-radius: calc(1.25em / 2 + 0.125em);
    border: 0.125em solid #000000;
    cursor: pointer;
}

.swither_on {
    background-color: #008000;
}

.switherLever {
    position: absolute;
    top: 0.125em;
    left: 0.125em;
    height: 0.75em;
    width: 0.75em;
    border-radius: 50%;
    background-color: #ffffff;
    border: 0.0625em solid #000000;
    transition: all 0.2s linear 0s;
}

.switherLever_on {
    left: calc(100% - (0.75em + 0.125em));
}

.switherDescription {
    margin-top: 5px;
    font-size: 0.8em;
    font-weight: 400;
    line-height: 1.15;
    color: #999999;
}
</style>
