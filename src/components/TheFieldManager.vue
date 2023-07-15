<script setup lang="ts">
const emit = defineEmits();

const newGame = ():void => {
    emit('newGame');
};
</script>

<template>
<div class="fieldManager">
    <button class="button" @click="newGame">Новая игра</button>
</div>
</template>

<style scoped>

</style>
