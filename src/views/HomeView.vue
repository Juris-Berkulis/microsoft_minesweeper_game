<script setup lang="ts">
import TheFieldManager from '@/components/TheFieldManager.vue';
import TheField from '../components/TheField.vue';
import { ref } from 'vue';
import type TheFieldVue from '../components/TheField.vue';

const theFieldRef = ref<InstanceType<typeof TheFieldVue> | null>(null);

const newGame = ():void => {
    theFieldRef.value?.startGame();
};
</script>

<template>
<div class="fieldWrapper">
    <TheField ref="theFieldRef" />
    <TheFieldManager @newGame="newGame" />
</div>
</template>

<style scoped>
</style>
