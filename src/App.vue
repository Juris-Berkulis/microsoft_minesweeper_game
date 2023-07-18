<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
<div class="wrapper">
  <main>
    <RouterView />
  </main>
</div>
</template>

<style scoped>
.wrapper {
  height: 100%;
  width: 100%;
  padding: min(5vh, 5vw) 0;
}
</style>
