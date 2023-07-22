<script setup lang="ts">
interface Props {
    to?: string,
};

defineProps<Props>();
</script>

<template>
<RouterLink class="button" v-if="to" :to="to">
    <slot />
</RouterLink>
<button class="button" v-else>
    <slot />
</button>
</template>

<style scoped>
.button {
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
